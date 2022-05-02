const express = require("express");
const router = express.Router();
const { celebrate, Joi } = require("celebrate");
const {
  registerUser,
  loginUser,
  logoutUser,
  getMe,
  getAllUsers,
} = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");

router.post(
  "/register",
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().email().required(),
      // usertype: Joi.string().required().default("user"),
      password: Joi.string().required().min(4),
    }),
  }),
  registerUser
);
router.post("/login", loginUser);
// router.post("/loguot", logoutUser);does not necessary as token expires in 10 days
router.get("/me", protect, getMe);
router.get("/all", getAllUsers);

module.exports = router;
