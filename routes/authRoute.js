const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const cors = require('cors')
require('dotenv').config()

// models

const { User } = require('../models/User')


router.use(cors())

router.post('/registration', express.json(), async (req,res) => {
    try {
        const { username, password } = req.body;
        const foundUser = await User.findOne({username: username});

        if(!foundUser) {
            const hash = await bcrypt.hash(password, 10);
            const newUser = new User({
                username: username,
                password: hash
            });
            const savedUser = await newUser.save()

            const token = jwt.sign({ _id: savedUser.id }, process.env.JWT_SECRET);
            res.send(token)
        } else {
            res.status(500).send("User already exists")
        };
    } catch (error) {
        console.log(error)
    }
});

router.get('/login', async (req, res) => {
    try {
        const auth = req.headers.authorization;
        const base64String = auth.split(' ')[1];
        const credentials = Buffer.from(base64String, 'base64').toString('ascii');
        const [ username, password ] = credentials.split(':');
        const foundUser = await User.findOne({username: username});
        
        const match = await bcrypt.compare(password, foundUser.password);

    if (!match) {
        res.status(401).send('not authenticated')
    } else {
       const token = jwt.sign({ _id: foundUser.id }, process.env.JWT_SECRET);
       res.send(token)
    }
    } catch (error) {
        res.status(401).send('not authenticated')
    }
    
});

module.exports = router;