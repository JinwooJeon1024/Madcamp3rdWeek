const User = require('../../models/User');
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

    // JWT 생성
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '24h' });

    res.send({ token });
  } catch (error) {
    res.status(500).send('Error in login');
  }
};
