const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (token && token.startsWith('Bearer ')) {
    req.token = token.slice(7, token.length).trim();
  } else {
    return res.status(403).send({ message: '토큰 형식이 올바르지 않습니다.' });
  }


  if (!token) {
    return res.status(403).send({ message: '토큰이 필요합니다.' });
  }

try {
    const decoded = jwt.verify(req.token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
} catch (error) {
    return res.status(401).send({ message: `${req.token}유효하지 않은 토큰입니다.` });
}

};

module.exports = verifyToken;
