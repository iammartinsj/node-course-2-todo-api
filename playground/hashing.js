const jwt = require('jsonwebtoken');

const data = {
  id: 10
};

const token = jwt.sign(data, '123abc');
console.log('token:' + token);

const verified = jwt.verify(token, '123abc');
console.log('verified:' + JSON.stringify(verified, undefined, 2));