const Router = require("express-promise-router");
const { requireSignIn } = require("../controller/auth.controller");
const { CALCULATIONS } = require("../controller/calculation.controller");
const router = new Router();

router.post('/online-calculation', CALCULATIONS)

module.exports = router;