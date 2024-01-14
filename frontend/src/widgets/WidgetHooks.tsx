import axios, { AxiosError } from "axios";
import React, { ReactElement, useCallback, useEffect, useState } from "react";
import Draggable, { DraggableEventHandler } from "react-draggable";
import TextWidget from "./customWidgets/TextWidget";
import { WidgetData, WidgetProps } from "../types/Type";

export function useWidgetData<T extends WidgetData>(
  id: number,
  initialValue: T
){
  const [widgetData, setWidgetData] = useState<T>(initialValue);

  const fetchPosition = useCallback(async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/position/get`,
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
        await axios.post(`${process.env.REACT_APP_API_URL}/widget/save`, {
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
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/widget/save`);
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

  
  async function addWidget(widgetData : WidgetData, widgetType : string) {
    // DB에 widgetData 추가
    // 다시 fetch 하도록 실행
    try{
      //post에 서버 경로 추가
      const response = await axios.post('', {widgetData, widgetType});
      console.log(response.data);
    } catch(error){
      if(axios.isAxiosError(error)){
          const axiosError = error as AxiosError;
          if(axiosError.response){
              console.error("Error submitting form : ", error.response?.data);
          }
          else{
              console.error("Unexpected error : ", error);
          }
          
      } else {
          console.error("Non-Axios error : ", error);
      }
    }
    switch(widgetType){
      case "TextWidget":
        //TODO: length로 ID를 부여하면 삭제 구현 시 id가 같은 아이디가 생길 수 있음
        setWidgets([...widgets, React.createElement(TextWidget)])
        console.log(widgets.length)
        break;
      default:
        break;
    }
  }
  

  function deleteWidget(widgetId: number) {
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
