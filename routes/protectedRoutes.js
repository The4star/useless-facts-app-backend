const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const checkToken = (req, res, next) => {

    try {
        const auth = req.headers.authorization.split(" ");
        const token = auth[1];
        const decodedPayload = jwt.verify(token, process.env.JWT_SECRET);
        req.userID = decodedPayload._id
        next()
    } catch (error) {
        console.log(error)
    }
};

router.get('/secrets', checkToken, (req, res) => {
    console.log(req.userID)
    res.send('accessing secret stuff, you must have been authenticated!')
});

module.exports = router;