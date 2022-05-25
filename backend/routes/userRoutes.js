const express = require("express");
const router = express.Router();
const { celebrate, Joi } = require("celebrate");
const {
  registerUser,
  loginUser,
  // logoutUser,
  getMe,
  getAllUsers,
  deleteUser,
  addUser,
} = require("../controllers/userController");
const { protect, protectAdmin } = require("../middleware/authMiddleware");

router.post(
  "/register",
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().email().required(),
      usertype: Joi.string().required().default('user').min(2).max(6),
      password: Joi.string().required().min(4),
    }),
  }),
  registerUser
);
router.post(
  "/login",
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().required().min(4),
    }),
  }),
  loginUser
);
// router.post("/loguot", logoutUser);does not necessary as token expires in 10 days
router.get("/me", protect, getMe);
//for admin only
router.get("/all", protectAdmin, getAllUsers);
router.post(
  "/adduser",
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().email().required(),
      usertype: Joi.string().required().min(2).max(6),
      password: Joi.string().required().min(4),
    }),
  }),
  protectAdmin,
  registerUser
);
router.get(
  "/adduser",
  protectAdmin,
  registerUser
);

router.delete("/:id", deleteUser);

module.exports = router;
