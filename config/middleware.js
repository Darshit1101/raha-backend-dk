// const jwt = require('jsonwebtoken');

module.exports.checkAuth = (req, res, next) => {
  var token = req.headers.authorization;
  if (token && token.split(' ').length > 1 && token.split(' ')[0] == 'Bearer') {
    jwt.verify(token.split(' ')[1], process.env.JWT_SECRET_KEY, async (err, decoded) => {
      if (err) {
        req.decoded = undefined;
        return res.status(401).send({ status: 'Unauthorized', msg: msgObj.UNAUTHORIZE });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    req.decoded = undefined;
    return res.status(401).send({ status: 'Unauthorized', msg: msgObj.UNAUTHORIZE });
  }
}