const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs')
const User = require('../models/User')

router.get('/login', (req,res) => res.render('login'));

router.get('/register', (req,res) => res.render('register'));
// handler 
//json
/*
router.post('/register',(req,res) => {
    const body = req.body

    res.json({
        confirmation: 'success',
        data:body
    })
}) */

//database 
router.post ('/register', async(req,res) => {
    try{
        const userData = new User({
            username: req.body.username,
            password: req.body.password,
            company: req.body.company,
            industry: req.body.industry,
            hear: req.body.hear,
            email: req.body.email,
            phone: req.body.phone,
            track: req.body.track,
        })
        const User = await userData.save();
        res.status(201).redirect('/users/login') 
    

    }catch(error){
        res.status(400).send(error)

    }

})

router.get('/reset' , (req,res) => res.resder('reset'))



module.exports = router;