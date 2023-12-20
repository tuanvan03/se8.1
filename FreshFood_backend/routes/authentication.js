var express = require('express');
var router = express.Router();
const {userRegister} = require("../services/authentication.service");

router.post('/register', async(req, res, next) => {
  let body = req.body;

  let response = await userRegister(body);
  res.json(response);
});

module.exports = router;