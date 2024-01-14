import axios from "axios";
import React, { ReactElement, useCallback, useEffect, useState } from "react";
import Draggable, { DraggableEventHandler } from "react-draggable";
import TextWidget from "./customWidgets/TextWidget";
import { WidgetData, WidgetProps } from "../types/Type";

export function useWidgetData<T extends WidgetData>(
  id: number,
  initialValue: T
) {
  const [widgetData, setWidgetData] = useState<T>(initialValue);

  const fetchPosition = useCallback(async () => {
    try {
      const response = await axios.get(
        "http://143.248.196.71:5000/api/position/get",
        { params: { id } }
      );
      setWidgetData(response.data);
      console.log("위치 정보를 불러오는 데 성공했습니다.");
    } catch (error) {
      console.error("위치 정보를 불러오는 데 실패했습니다.", error);
    }
  }, [id]);

  useEffect(() => {
    fetchPosition();
  }, [fetchPosition]);

  useEffect(() => {
    async function saveWidgetData() {
      try {
        await axios.post("http://143.248.196.71:5000/api/position/save", {
          id,
          widgetData,
        });
        console.log("위치 정보가 저장되었습니다.");
      } catch (error) {
        console.error("위치 정보 저장에 실패했습니다.", error);
      }
    }

    saveWidgetData();
  }, [id, widgetData]);

  return { widgetData, setWidgetData };
}

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

export const Widget = <T extends WidgetData>({
  widgetData,
  setWidgetData,
  children,
}: WidgetProps<T>) => {
  const handleDragStop: DraggableEventHandler = (e, data) => {
    setWidgetData({
      ...widgetData,
      position: { x: data.x, y: data.y },
    });
  };

  return (
    <Draggable onStop={handleDragStop}>
      <div>{children}</div>
    </Draggable>
  );
};
