import React from "react";
import { useNavigate } from "react-router-dom";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { WidgetType } from "../types/Type";
import "./EditPage.css";
import { useWidgets } from "../recoil/WidgetList";
import WIDGET_MENU from "../widgets/WidgetMenu";
import Draggable, { DraggableData } from "react-draggable";
import axios, { AxiosError } from "axios";
import TextWidget from "../widgets/customWidgets/TextWidget";

const EditPage = () => {
  const {widgets, addWidget, updatePosition} = useWidgets()

  console.log(widgets.map((widget)=>widget.props));

  const navigate = useNavigate();
  function handleDone() {
    navigate("/main");
  }
  function handleCancel() {
    // TODO : 디비로 처음 fetch받은 내용 보내기
  }
  function handleOnDragStart(event: React.DragEvent, widgetType: WidgetType) {
    event.stopPropagation();
    event.dataTransfer.setData("widgetType", widgetType);
  }
  function handleOnDragOver(event: React.DragEvent){
    event.preventDefault();
  }
  function handlePosition(data: DraggableData, widgetId : string){
    updatePosition(widgetId, data)
  }
  async function handleOnNewWidgetDrop(event: React.DragEvent){
    //recoil에 추가
    const widgetType = event.dataTransfer.getData("widgetType") as WidgetType;
    const mouseX = event.clientX;
    const mouseY = event.clientY;
    console.log(`X : ${mouseX}, Y : ${mouseY}`)
    try {
      const userToken = localStorage.getItem("userToken");

      const request = {type : widgetType, x : mouseX, y : mouseY, width : 0, height : 0}
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/widget/create`, request, {headers: {authorization: `Bearer ${userToken}`}});
      switch(widgetType){
        case "TextWidget":
          console.log("Add new TextWidget")
          //TODO : 위젯 아이디 부여하는 거 바꿔야함
          //지우지 말 것, width와 height는 css 파일과 일치시켜야하고 px단위를 쓰도록 해야함
          const newTextWidget =(<TextWidget
                                widgetId={response.data.data._id} 
                                widgetTopLeftX={response.data.data.x} 
                                widgetTopLeftY={response.data.data.y} 
                                width={500} 
                                height={500} 
                                text={""}/>)
          addWidget(newTextWidget)
          break;
        default:
          break;
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        if (axiosError.response) {
          console.error("Error submitting form : ", error.response?.data);
        } else {
          console.error("Unexpected error : ", error);
        }
      } else {
        console.error("Non-Axios error : ", error);
      }
    }
  }

  return (
    <div className="Container">
      <div className="Whiteboard"
        onDrop={handleOnNewWidgetDrop}
        onDragOver={handleOnDragOver}>
        {widgets.map((widget) => (
          <Draggable
            key={widget.props.widgetId}
            onStop={(event, data) => handlePosition(data, widget.props.widgetId)}
            defaultPosition={{x: widget.props.widgetTopLeftX, y: widget.props.widgetTopLeftY}}
            bounds="parent"
            cancel=".Resize_box">
            <div
              style={{position:'absolute'}}>
              {widget}
              <div
                className="Resize_box"
                draggable>
              </div>
            </div>
          </Draggable>
        ))}
      </div>
      <Draggable cancel=".Widget_pick">
          <div className="Menu">
            {WIDGET_MENU.map(({ type, image }) => (
              <div
                draggable
                className="Widget_pick"
                onDragStart={(event) => handleOnDragStart(event, type)}>
                <img src={image} alt={type} />
              </div>
            ))}
          </div>
      </Draggable>
      <button className="Right_button" onClick={handleDone}>
        완료
      </button>
      <button className="Left_button" onClick={handleCancel}>
        변경 사항 취소
      </button>
    </div>
  );
};

export default EditPage;
