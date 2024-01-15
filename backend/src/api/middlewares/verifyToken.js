const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(403).send({ message: '토큰이 필요합니다.' });
  }

  if (token.startsWith('Bearer ')) {
    req.token = token.slice(7, token.length).trim();
  } else {
    return res.status(403).send({ message: '토큰 형식이 올바르지 않습니다.' });
  }

  try {
    const decoded = jwt.verify(req.token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    console.error(`인증 실패: 토큰 - ${req.token}, 오류 - ${error.message}`);
    return res.status(401).send({ message: '유효하지 않은 토큰입니다.' });
  }
};

module.exports = verifyToken;
