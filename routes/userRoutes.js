const express = require('express');
const router = express.Router();
const validationToken = require('../middleware/validationTokenhandler');
const {
    registerUser,
    loginUser,
    currentUser
} = require('../controllers/usersController');
router.post('/register',registerUser);
router.post('/login',loginUser);
router.get('/current', validationToken, currentUser);



module.exports= router;