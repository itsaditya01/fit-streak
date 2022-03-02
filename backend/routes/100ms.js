const router = require("express").Router();
const { videoCallToken } = require("../controllers/100ms");

router.get("/management-token", videoCallToken);

module.exports = router;
