var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  username: {type: String, required: [ true, "must have username"], unique: true },
  password: {type: String, required: [true, "must have password"]}
});

const User = mongoose.model('User', userSchema);

module.exports= {
    User
};