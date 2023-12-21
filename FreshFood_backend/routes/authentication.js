var express = require('express');
var router = express.Router();
const { userRegister } = require('../services/authentication.service');
// Handles POST requests to '/register'
router.post('/register', async (req, res, next) => {
  // Extracts the request body
  let body = req.body;

  // Logs the request body to the console
  let respond = await userRegister(body);

  // Sends the request body as a JSON response
  res.json(respond);

});

// Export the router to be used in other parts of the application
module.exports = router;
