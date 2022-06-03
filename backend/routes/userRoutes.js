const express = require("express");
const router = express.Router();
const { celebrate, Joi } = require("celebrate");
const {
  registerUser,
  loginUser,
  logoutUser,
  getMe,
  getAllUsers,
  deleteUser,
  updateUser,
  addUser,
} = require("../controllers/userController");
const { protect, protectAdmin } = require("../middleware/authMiddleware");

router.post(
  "/register",
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().email().required(),
      usertype: Joi.string().required().default("user").min(2).max(6),
      password: Joi.string().required().min(8),
    }),
  }),
  registerUser
);
router.post(
  "/login",
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().required().min(8),
    }),
  }),
  loginUser
);
router.post("/logout", logoutUser);
router.get("/me", protect, getMe);
//for admin only
router.get("/all", protectAdmin, getAllUsers);
router.post(
  "/adduser",
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().email().required(),
      usertype: Joi.string().required().min(2).max(6),
      password: Joi.string().required().min(8),
    }),
  }),
  registerUser
);

router.delete("/:id", deleteUser);
router.patch(
  "/:id",
  celebrate({
    body: Joi.object().keys({
      usertype: Joi.string().required().min(2).max(6),
    }),
  }),
  updateUser
);

module.exports = router;
