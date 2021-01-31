const express = require("express");
const Router = require("express-promise-router");
const router = new Router();

const { SIGNUP } = require("../controller/auth.controller");

router.post("/signup", SIGNUP);

module.exports = router;
