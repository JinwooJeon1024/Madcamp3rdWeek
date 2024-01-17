const backGroundImageData = require('../../models/Image'); // 모델 경로 확인 필요

const fetchImage = async (req, res) => {
    const userId = req.userId; // 사용자 ID 추출

    try {
        // 사용자 ID로 이미지 데이터 검색
        const imageData = await backGroundImageData.findOne({ userId });

        // 이미지 데이터가 존재하는 경우 URL 반환
        if (imageData) {
            res.status(200).json({ imageUrl: imageData.url });
        } else {
            res.status(404).json({ message: '이미지 데이터를 찾을 수 없습니다.' });
        }
    } catch (error) {
        res.status(500).json({ message: '이미지 데이터 조회에 실패했습니다.', error });
    }
};


const updateImage = async (req, res) => {
    const userId = req.userId; // 사용자 ID 추출
    const { url } = req.body; // 요청 본문에서 URL 추출

    try {
        // 사용자 ID로 이미지
        const imageData = await backGroundImageData.findOneAndUpdate(
            { userId },
            { $set: { url } },
            { new: true, upsert: true }
        );

        res.status(200).json({ message: '이미지가 업데이트되었습니다.', data: imageData });
    } catch (error) {
        res.status(500).json({ message: '이미지 업데이트에 실패했습니다.', error });
    }
};

module.exports = {
    fetchImage,
    updateImage
};