//Third party modules
const mongoose = require('mongoose');

//Modify Mongoose base in the environment
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI);

//Export mongoose
module.exports = { mongoose };