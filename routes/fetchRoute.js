const express = require('express');
const router = express.Router();
const axios = require('axios')
require('dotenv').config()

router.get('/', async (req, res) => {
    
    const photoResponse = await axios.get(`https://api.unsplash.com/photos/random/?client_id=${process.env.PHOTO}`)
    const photo = photoResponse.data

    const factResponse = await axios.get("https://uselessfacts.jsph.pl/random.json?language=en")
    const fact = factResponse.data

    const data = {
        fact: fact.text,
        photo: photo.urls.small
    };

    res.send(data)
});

module.exports = router;