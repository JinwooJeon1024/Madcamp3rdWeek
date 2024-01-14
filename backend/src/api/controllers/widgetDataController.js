const widgetData = require('../../models/Widget');

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
        
        const newData = new widgetData({ x, y });
        await newData.save();

        res.status(201).json({ message: '데이터가 저장되었습니다.', data: newData });
    } catch (error) {
        res.status(500).json({ message: '데이터를 저장하는 데 실패했습니다.', error });
    }
};

const addWidgetData = async (req, res) => {
    try {
        // 요청에서 widgetData와 type을 추출합니다.
        const { widgetData, type } = req.body;

        // 새로운 Widget 인스턴스 생성
        const newWidget = new Widget({
            type: type,
            position: widgetData.position
            // 필요한 경우 여기에 size, color 등의 추가 데이터를 포함할 수 있습니다.
        });

        // MongoDB에 저장
        await newWidget.save();

        // 생성된 _id를 응답으로 반환
        res.status(201).json({ message: "Widget successfully added", id: newWidget._id });
    } catch (error) {
        // 오류 처리
        res.status(500).json({ message: "Error adding widget", error: error.message });
    }
}

module.exports = {
    getWidgetData,
    saveWidgetData,
    addWidgetData
};