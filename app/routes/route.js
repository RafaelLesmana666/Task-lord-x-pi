/* express-server */
const express = require("express");
const router = express.Router();

/* mongodb-server */
// const auth = require("./middlewares/auth");
// const Users = require('./controllers/UsersController');
const Users = require('../controllers/UsersController')

router.post("/signup",Users.register);
router.post("/login", Users.login);

module.exports = router;