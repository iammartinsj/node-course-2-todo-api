const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    minLength: 1,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: '{VALUE} is not a valid email'
    }
  },
  password: {
    type: String,
    required: true,
    minLength: 6
  },
  tokens: [{
    access: {
      type: String,
      required: true
    },
    token:{
      type: String,
      required: true
    }
  }]
});

UserSchema.pre('save', function(next){
  var user = this;
  if(user.isModified('password')){
    const password = user.password;
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(password, salt, (err, hash) => {
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

UserSchema.statics.findByToken = function(token){
  const User = this;
  let decoded;

  try{
    decoded = jwt.verify(token, '123abc');
    console.log(decoded);
  } catch(e){
    return Promise.reject();
  }

  return User.findOne({
    '_id': decoded._id,
    'tokens.token': token,
    'tokens.access': 'auth'
  });
};

UserSchema.methods.toJSON = function(){
  var user = this;
  var userObject = user.toObject();
  return _.pick(userObject, ['_id','email']);
};

UserSchema.methods.generateAuthToken = function(){
  const user = this;
  const access = 'auth';
  const token = jwt.sign({_id: user._id.toHexString(), access}, '123abc').toString();
  user.tokens = user.tokens.concat([{access, token}]);

  return user.save().then(() => {
    return token;
  });
};

const User = mongoose.model('User', UserSchema);

module.exports = { User }