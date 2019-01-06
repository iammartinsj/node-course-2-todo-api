//Relative Modules
const { User } = require('./../model/user');

//Request Middleware
//Authenticate user 
const authenticate = (req,res,next) => {
  const token = req.header('x-auth');

  User.findByToken(token).then((user) => {
    if(!user){
      return Promise.reject();
    }
    req.user = user;
    req.token = token;
    next();
  }).catch(() => {
    res.status(401).send();
  });
}

//Export Authenticate Function
module.exports = { authenticate }