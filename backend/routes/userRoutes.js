const express = require("express");
const router = express.Router();
const { celebrate, Joi } = require("celebrate");
const {
  registerUser,
  loginUser,
  // logoutUser,
  getMe,
  getAllUsers,
  deleteUser
} = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");

router.post(
  "/register",
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().email().required(),
      usertype: Joi.string().min(2).max(6),
      password: Joi.string().required().min(4),
    }),
  }),
  registerUser
);
router.post("/login", loginUser);
// router.post("/loguot", logoutUser);does not necessary as token expires in 10 days
router.get("/me", protect, getMe);
//for admin only
router.get("/all", getAllUsers);
router.delete("/:id", deleteUser);

module.exports = router;
