var express = require("express");
var router = express.Router();

router.get("/", function(req, res, next) {
    res.send("API is not working properly");
});

module.exports = router;