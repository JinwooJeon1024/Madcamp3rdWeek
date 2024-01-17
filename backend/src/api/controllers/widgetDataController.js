const WidgetData = require('../../models/Widget'); // 모델 경로 확인 필요

// 위젯 데이터 생성하기 (Create)
const createWidgetData = async (req, res) => {
    console.log(req.body);
    const { properties } = req.body;
    const userId = req.userId;
    try {
        const newWidget = new WidgetData({ userId, properties });
        await newWidget.save();
        res.status(201).json({ message: '위젯이 생성되었습니다.', data: newWidget });
    } catch (error) {
        res.status(500).json({ message: '위젯 생성에 실패했습니다.', error });
    }
};

const replaceAllWidgetData = async (req, res) => {
    const { widgets } = req.body; // 클라이언트에서 제공하는 새 위젯 데이터
    const userId = req.userId;

    try {
        // 기존 데이터 삭제
        await WidgetData.deleteMany({ userId });

        // 새 데이터 추가
        const newWidgets = await WidgetData.insertMany(
            widgets.map(widget => ({
                userId,
                properties: widget.properties // 이미 properties 객체로 된 데이터 사용
            }))
        );
        console.log(newWidgets);

        res.status(200).json({ message: '모든 위젯 데이터가 교체되었습니다.', data: newWidgets });
    } catch (error) {
        res.status(500).json({ message: '위젯 데이터 교체 실패', error });
    }
};


const getAllWidgetData = async (req, res) => {
    const userId = req.userId;

    try {
        const widgets = await WidgetData.find({ userId }); // 모든 위젯 데이터 조회
        res.status(200).json(widgets);
    } catch (error) {
        res.status(500).json({ message: '데이터를 불러오는데 실패했습니다.', error });
    }
};

module.exports = {
    createWidgetData,
    replaceAllWidgetData,
    getAllWidgetData
};
