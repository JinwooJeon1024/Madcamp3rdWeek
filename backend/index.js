const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./src/api/routes/authRoutes'); // 사용자 정의 라우트
const widgetRoutes = require('./src/api/routes/widgetDataRoutes');
const imageRoutes = require('./src/api/routes/backGroundImageRoutes');
const db = require('./src/config/db')

const app = express();

// 미들웨어 설정
app.use(cors());
app.use(bodyParser.json({
  limit : "200mb"
}));

// 라우트 설정
app.use('/api/users', authRoutes);
app.use('/api/widget', widgetRoutes);
app.use('/api/image', imageRoutes);

// 데이터베이스 연결 (예: MongoDB, MySQL 등)
db.connectDatabase();

// 서버 시작
const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
