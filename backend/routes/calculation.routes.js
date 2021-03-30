const Router = require("express-promise-router");
const { CALCULATIONS } = require("../controller/calculation.controller");
const router = new Router();

router.post('/online-calculation', CALCULATIONS)

module.exports = router;