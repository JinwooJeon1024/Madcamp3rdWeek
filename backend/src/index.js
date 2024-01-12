const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const userRoutes = require('./api/routes/userRoutes'); // 사용자 정의 라우트
const errorHandler = require('./api/middlewares/errorMiddleware'); // 에러 핸들링 미들웨어

const app = express();

// 미들웨어 설정
app.use(cors());
app.use(bodyParser.json());

// 라우트 설정
app.use('/api/users', userRoutes);

// 에러 핸들링 미들웨어
app.use(errorHandler);

// 데이터베이스 연결 (예: MongoDB, MySQL 등)
// db.connect();

// 서버 시작
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
