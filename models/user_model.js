//Require Mongoose
var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  login: String,
  password: String,
  stations: [Number]
});


// Compile model from schema
var User = mongoose.model('User', UserSchema);

module.exports = User;
