const Position = require('../../models/Position');

const getPosition = async (req, res) => {
    try {
        // MongoDB에서 가장 최근의 위치 정보를 불러옵니다.
        const position = await Position.findOne().sort({ _id: -1 });
        if (position) {
            res.json(position);
        } else {
            res.status(404).json({ message: '위치 정보가 없습니다.' });
        }
    } catch (error) {
        res.status(500).json({ message: '위치 정보를 불러오는 데 실패했습니다.', error });
    }
};

const savePosition = async (req, res) => {
    try {
        const { x, y } = req.body;
        
        // 새로운 위치 정보를 생성하고 MongoDB에 저장합니다.
        const newPosition = new Position({ x, y });
        await newPosition.save();

        res.status(201).json({ message: '위치 정보가 저장되었습니다.', position: newPosition });
    } catch (error) {
        res.status(500).json({ message: '위치 정보를 저장하는 데 실패했습니다.', error });
    }
};

module.exports = {
    getPosition,
    savePosition
};
