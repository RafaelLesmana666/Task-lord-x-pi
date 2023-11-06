/* express-server */
const express = require("express");
const router = express.Router();

/* mongodb-server */
const auth = require("../app/middlewares/auth");
const Users = require('../app/controllers/UsersController');

router.post("/signup",Users.register);
router.post("/login", Users.login);

module.exports = router;