import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import Draggable, { DraggableEventHandler } from "react-draggable";

export type WidgetData = {
  position: { x: number; y: number };
};

type WidgetProps<T extends WidgetData> = {
  children: React.ReactNode;

  widgetData: T;
  setWidgetData: (data: T) => void;
};

// id: 가져오려는 위젯의 id
// initialValue: 서버로부터 가져오기 전에 임의로 설정할 초기 데이터
//
// 리턴하는 것들
// widgetData: 서버로부터 가져온 위젯 데이터 (서버로부터 가져오기 전인 경우 initialValue와 같음)
// setWidgetData: 위젯 데이터를 변경하고 서버에 변경된 데이터를 업로드 함

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
