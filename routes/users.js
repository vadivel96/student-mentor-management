var express = require("express");
var router = express.Router();
const { usersCallBack } = require("./router_callbacks/usersCallback");

/* GET users listing. */
router.get("/",usersCallBack);

module.exports = router;
