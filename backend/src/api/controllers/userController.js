const getUserInfo = (req, res) => {
  const { name, email } = req.user; // 토큰에서 추출한 사용자 정보
  res.send({ name, email });
};

module.exports = { getUserInfo };
