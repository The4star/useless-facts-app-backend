const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const bcrypt = require('bcrypt');

// local
const { User } = require('../models/User');

router.get('/', async (req, res) => {
    try {
        const userSeeds = require('../userSeedFile');
        const usersArray = [...userSeeds];
        const hashedUsers = usersArray.map(async user => {
        const hash = await bcrypt.hash(user.password, 10);
            return {username: user.username, password: hash} 
            });
        const parsedUsers = await Promise.all(hashedUsers)

        await User.deleteMany({});
        await User.insertMany(parsedUsers);
        res.send('database cleared and seeded')
    } catch (error) {
        console.log(error)
    }
});

module.exports = router;