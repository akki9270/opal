const express = require("express");
const Router = require("express-promise-router");
const router = new Router();

const { SIGNUP, SIGNIN, LOGOUT } = require("../controller/auth.controller");

router.post("/auth/signup", SIGNUP);
router.post("/auth/signin", SIGNIN);
router.get('/auth/logout', LOGOUT);

module.exports = router;
