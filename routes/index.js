const express  = require('express');
const router = express.Router();
//const {ensureAuthenticated } = require('../config/auth')


//index
//router.get('/' ,(req,res) => res.send('welcome to home page'))
router.get('/', (req,res) => res.render('index'));



module.exports = router; 