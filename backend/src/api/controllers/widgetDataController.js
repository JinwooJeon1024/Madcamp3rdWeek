const Data = require('../../models/Widget');

const getWidgetData = async (req, res) => {
    try {
        const data = await data.findOne().sort({ _id: -1 });
        if (data) {
            res.json(data);
        } else {
            res.status(404).json({ message: '데이터가 없습니다.' });
        }
    } catch (error) {
        res.status(500).json({ message: '데이터를 불러오는데 실패했습니다.', error });
    }
};

const saveWidgetData = async (req, res) => {
    try {
        const { x, y } = req.body;
        
        const newData = new Data({ x, y });
        await newData.save();

        res.status(201).json({ message: '데이터가 저장되었습니다.', data: newData });
    } catch (error) {
        res.status(500).json({ message: '데이터를 저장하는 데 실패했습니다.', error });
    }
};

module.exports = {
    getWidgetData,
    saveWidgetData
};
