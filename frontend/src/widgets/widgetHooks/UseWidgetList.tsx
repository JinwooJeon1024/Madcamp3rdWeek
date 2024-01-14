import axios from "axios";
import React, { ReactElement, useEffect } from "react";
import { useState } from "react";
import TextWidget from "../customWidgets/TextWidget";
import { WidgetData } from "../../types/Type";

function useWidgetList() {
  const [widgets, setWidgets] = useState<ReactElement[]>([]);

  function fetchWidget() {
    async function getWidgetData() {
      try {
        const response = await axios.post(
          `${process.env.REACT_API_APP_URL}/api/widget/save`
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

  useEffect(() => {
    fetchWidget();
  }, []);

  function addWidget(widgetData: WidgetData) {
    // DB에 widgetData 추가
    // 다시 fetch 하도록 실행
  }

  function deleteWidget(widgetData: WidgetData) {
    // DB에 widgetId에 해당하는 위젯 삭제 하도록 조치
    // 다시 fetch 하도록 실행
  }

  return { widgets, addWidget, deleteWidget };
}

export default useWidgetList;