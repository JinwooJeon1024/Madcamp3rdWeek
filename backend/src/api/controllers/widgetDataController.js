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
        await WidgetData.deleteMany({});

        widgets = widgets.map(widget => ({ userId, ...widget }));

        // 새 데이터 추가
        const newWidgets = await WidgetData.insertMany(widgets);

        res.status(200).json({ message: '모든 위젯 데이터가 교체되었습니다.', data: newWidgets });
    } catch (error) {
        res.status(500).json({ message: '위젯 데이터 교체 실패', error });
    }
};

const getAllWidgetData = async (req, res) => {
    try {
        const widgets = await WidgetData.find({}); // 모든 위젯 데이터 조회
        res.status(200).json(widgets);
    } catch (error) {
        res.status(500).json({ message: '데이터를 불러오는데 실패했습니다.', error });
    }
};

// 위젯 데이터 가져오기 (Read)
// const getWidgetData = async (req, res) => {
//     try {
//         const userId = req.userId;

//         const data = await WidgetData.find({ userId }).sort({ _id: -1 })
//         if (data.length > 0) {
//             res.json(data);
//         } else {
//             res.status(404).json({ message: '데이터가 없습니다.' });
//         }
//     } catch (error) {
//         res.status(500).json({ message: '데이터를 불러오는데 실패했습니다.', error });
//     }
// };

// 위젯 데이터 업데이트하기 (Update)
// const updateWidgetData = async (req, res) => {
//     const { id } = req.params;
//     const updateData = req.body;

//     try {
//         const updatedWidget = await WidgetData.findByIdAndUpdate(id, updateData, { new: true });
//         if (!updatedWidget) {
//             return res.status(404).json({ message: '위젯을 찾을 수 없습니다.' });
//         }
//         res.json({ message: '위젯이 업데이트 되었습니다.', data: updatedWidget });
//     } catch (error) {
//         res.status(500).json({ message: '위젯 업데이트 실패', error });
//     }
// };

// // 위젯 데이터 삭제하기 (Delete)
// const deleteWidgetData = async (req, res) => {
//     const { id } = req.params;

//     try {
//         const deletedWidget = await WidgetData.findByIdAndDelete(id);
//         if (!deletedWidget) {
//             return res.status(404).json({ message: '위젯을 찾을 수 없습니다.' });
//         }
//         res.json({ message: '위젯이 삭제되었습니다.' });
//     } catch (error) {
//         res.status(500).json({ message: '위젯 삭제 실패', error });
//     }
// };

module.exports = {
    createWidgetData,
    replaceAllWidgetData,
    getAllWidgetData
};
