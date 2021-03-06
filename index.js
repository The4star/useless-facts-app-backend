const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const morgan = require('morgan');
const jwt = require('jsonwebtoken')
const cors = require('cors')
require('dotenv').config()

const app = express();

app.use(cors())
app.use(morgan('dev'))

// utils
const {dbConnection, db, options } = require('./utils/database-utils');

// models

const { User } = require('./models/User')

// routes

const seedRoute = require('./routes/seedUsers')
const authRoute = require('./routes/authRoute')
const fetchRoute = require('./routes/fetchRoute')

const PORT = process.env.PORT || 5000;

mongoose.connect(db, options, (err) => dbConnection(err));

app.use('/seed', seedRoute);
app.use('/auth', authRoute);
app.use('/fetch', fetchRoute);

app.listen(PORT, () => console.log(`listening on port ${PORT}`));