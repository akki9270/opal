const express = require("express");
const Router = require("express-promise-router");
const router = new Router();

const { SIGNUP, SIGNIN } = require("../controller/auth.controller");

router.post("/auth/signup", SIGNUP);
router.post("/auth/signin", SIGNIN);

module.exports = router;
