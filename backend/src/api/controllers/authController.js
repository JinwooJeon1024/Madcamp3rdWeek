const User = require('../../models/User');
const defaultWidget = require('../../models/Widget');
const defaultImage = require('../../models/Image');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  try {
    const { email, password, name } = req.body;

    // 이메일 중복 검사
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send('Email already in use');
    }

    // 비밀번호 해싱
    const hashedPassword = await bcrypt.hash(password, 10);

    // 사용자 생성
    const user = new User({
      email,
      password: hashedPassword,
      name
    });

    await user.save();

    const fixedUserId = mongoose.Types.ObjectId('65a7af63d6ac280005c6cb27');
    const widgetData = await WidgetData.findOne({ userId: fixedUserId });
    const imageData = await backGroundImageData.findOne({ userId: fixedUserId });
    // 새 사용자의 userId로 위젯 데이터 복사
    if (widgetData) {
      const newUserWidgetData = new defaultWidget({
        userId: user._id,
        properties: widgetData.properties
      });
      await newUserWidgetData.save();
    }

    // 새 사용자의 userId로 이미지 데이터 복사
    if (imageData) {
      const newUserImageData = new defaultImage({
        userId: user._id,
        url: imageData.url
      });
      await newUserImageData.save();
    }
    res.status(201).send({ message: 'User created successfully' });
  } catch (error) {
    res.status(500).send('Error in saving user');
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 사용자 검증
    const user = await User.findOne({ email });
    if (!user || !await bcrypt.compare(password, user.password)) {
      return res.status(401).send('Invalid credentials');
    }

    console.log(user._id);
    // JWT 생성
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);
    res.send({ token });
  } catch (error) {
    res.status(500).send('Error in login');
  }
};

exports.getUserInfo = async (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 토큰에서 사용자 ID 추출
    const userId = decoded.userId;

    // 사용자 ID로 사용자 정보 조회
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send('User not found');
    }

    // 사용자의 이름과 이메일 정보 반환
    res.status(200).send({ name: user.name, email: user.email });
  } catch (error) {
    res.status(500).send('Error in fetching user info');
  }
}

exports.deleteUser = async (req, res) => {
  try {
    const token = req.headers['authorization'].split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 토큰에서 사용자 ID 추출
    const userId = decoded.userId;

    // 사용자 삭제
    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
      return res.status(404).send('User not found');
    }

    // 성공적으로 삭제되었음을 응답
    res.status(200).send({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).send('Error in deleting user');
  }
};
