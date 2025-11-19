const express = require("express");
const { check } = require("express-validator");
const usersControllers = require("../controllers/user-controller");
const router = express.Router();
router.get("/", usersControllers.getusers);
router.post(
  "/signup",
  [
    check("name").not().isEmpty(),
    check("email").normalizeEmail().isEmail(),
    check("password").isLength({ min: 8 }),
  ],
  usersControllers.signup
);
router.post("/login", usersControllers.login);

// if the creator property in aplace holds the user id thats part of the url it's pthe place which i
module.exports = router;
