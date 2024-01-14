import React, { useState, useEffect, ReactElement } from "react";
import axios from "axios";
import Draggable, { DraggableEventHandler } from "react-draggable";
import { Widget, WidgetData, useWidgetData } from "./Widget";

export function useWidgetList() {
  const [widgets, setWidgets] = useState<ReactElement[]>([]);

  function fetchWidget() {
    async function getWidgetData() {
      try {
        const response = await axios.post(
          "http://143.248.196.71:5000/api/position/save"
        );
        console.log("위젯 데이터 불러오기에 성공했습니다.");
        const newWidgets = [];
        for (const res of response.data) {
          if (res.type === "TextWidget") {
            newWidgets.push(React.createElement(TextWidget, { id: res.id }));
          }
        }
        setWidgets(newWidgets);
      } catch (error) {
        console.error("위젯 데이터 불러오기에 실패했습니다", error);
      }
    }
    getWidgetData();
  }

  useEffect(() =>{
    fetchWidget();
  }, []);

  function addWidget(widgetData) {
    // DB에 widgetData 추가
    // 다시 fetch 하도록 실행
  }

  function deleteWidget(widgetData) {
    // DB에 widgetId에 해당하는 위젯 삭제 하도록 조치
    // 다시 fetch 하도록 실행
  }

  return {widgets, addWidget, deleteWidget};
}

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
