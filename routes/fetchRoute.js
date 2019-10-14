const express = require('express');
const router = express.Router();
const axios = require('axios')
const cors = require('cors')
require('dotenv').config()

router.use(cors())

router.get('/', async (req, res) => {
    try {
        const photoResponse = await axios.get(`https://api.unsplash.com/photos/random/?client_id=${process.env.PHOTO}`)
        const photo = photoResponse.data
    
        const factResponse = await axios.get("https://uselessfacts.jsph.pl/random.json?language=en")
        const fact = factResponse.data
    
        const data = {
            fact: fact.text,
            photo: photo.urls.small
        };
    
        res.send(data)
    } catch (error) {
        console.log(error)
    }
  
});

module.exports = router;