
const dbConnection = (err) => {
    if (err) {
        console.log(err);        
    } else {
        console.log(`db connected`);        
    }
}

const db = process.env.DBURL;
const options = { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true};

module.exports = {
    dbConnection,
    db,
    options
}