import React, { useState, useEffect } from "react";
import axios from "axios";
import Draggable, { DraggableEventHandler } from "react-draggable";
import { Widget, WidgetData, useWidgetData } from "./Widget";

interface Position {
  x: number;
  y: number;
}

type TextWidgetData = WidgetData & {
  type: "TextWidget";
  text: string;
};

type TextWidgetProps = {
  id: number;
};

function useWidgetList() {
  const [widgets, setWidgets] = useState<ReactElement[]>([]);

  function fetchWidget(){
    useEffect(() => {
      async function getWidgetData() {
        try {
          await axios.post("http://143.248.196.71:5000/api/position/save");
          console.log("위젯 데이터 불러오기에 성공했습니다.");
        } catch (error) {
          console.error("위젯 데이터 불러오기에 실패했습니다", error);
        }
      }
  }
    )
  //
  // [{id: 1, x: 10, y: 20, type: "TextWidget", text: "asdf"},
  // [{id: 2, x: 20, y: 100, type: "WeatherWidget"}]
  //
  // 하나씩 순회를 돌면서
  // widgetData.type === "TextWidget"
  // React.createElement(TextWidget, {id: widgetData.id})
  // widgetData.type === "WeatherWidget"
  // React.createElement(WeatherWidget, {id: widgetData.id})
  //
  // 결과적으로 react element의 리스트가 나오겠쬬?
  // 그걸 반환해주면 됨

  // const [widgetList, setWidgetList] = useState([]);

  function addWidget(widgetData) {
    // DB에 widgetData 추가
    // 다시 fetch 하도록 실행
  }

  function deleteWidget(widgetData) {
    // DB에 widgetId에 해당하는 위젯 삭제 하도록 조치
    // 다시 fetch 하도록 실행
  }

  // return {widgetList, addWidget, deleteWidget};
}

// function EditPage() {
//   const { widgeList, addWidget, deleteWidget } = useWidgetList();

//   //
//   addWidget();

//   //
//   deleteWidget();

//   return <MainPage widgetList={widgetList} />;
// }

const TextWidget = ({ id }: TextWidgetProps) => {
  const { widgetData, setWidgetData } = useWidgetData<TextWidgetData>(id, {
    type: "TextWidget",
    position: { x: 0, y: 0 },
    text: "",
  });

  return (
    <Widget widgetData={widgetData} setWidgetData={setWidgetData}>
      <div className="text-widget">
        <input
          type="text"
          value={widgetData.text}
          onChange={(event) => {
            setWidgetData({
              ...widgetData,
              text: event.target.value,
            });
          }}
        />
      </div>
    </Widget>
  );
};

export default TextWidget;
