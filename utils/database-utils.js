
const dbConnection = (err) => {
    if (err) {
        console.log(err);        
    } else {
        console.log(`db connected`);        
    }
}

const db = 'mongodb://localhost:27017/usersDB';
const options = { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true};

module.exports = {
    dbConnection,
    db,
    options
}