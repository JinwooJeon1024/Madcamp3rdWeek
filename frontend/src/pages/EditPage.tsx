import React, { useRef } from "react";
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
import registerMouseDownDrag from "../services/registerMouseDownDrag";

const EditPage = () => {
  const {widgets, addWidget, updatePosition, updateSize} = useWidgets()
  console.log(widgets.map((widget)=>widget.props));



  const navigate = useNavigate();
  function handleDone() {
    async function sendWidgets(){
      try {
        const userToken = localStorage.getItem("userToken");
        console.log({widgets: widgets})
        const request = {
          properties:{
            widgets: widgets
          }
        }
        console.log(request)
        const response = await axios.put(`${process.env.REACT_APP_API_URL}/widget/update`, request, {headers: {authorization: `Bearer ${userToken}`}});
        console.log(response.data)
        navigate("/main");
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
    sendWidgets()
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

      const request = { properties : {type : widgetType, x : 0, y : 0, width : 0, height : 0}}
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/widget/create`, request, {headers: {authorization: `Bearer ${userToken}`}});
      switch(widgetType){
        case "TextWidget":
          console.log("Add new TextWidget")
          //TODO : 위젯 아이디 부여하는 거 바꿔야함
          //지우지 말 것, width와 height는 css 파일과 일치시켜야하고 px단위를 쓰도록 해야함
          const newTextWidget =(<TextWidget
                                widgetId={response.data.data._id} 
                                widgetTopLeftX={mouseX} 
                                widgetTopLeftY={mouseY} 
                                width={100} 
                                height={100} 
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
                style={{position:'absolute'}}
                >
                {widget}
                <div
                  className="Resize_box"
                  draggable
                  {...registerMouseDownDrag((deltaX, deltaY)=>{
                    updateSize(widget.props.widgetId,deltaX+widget.props.width, deltaY+widget.props.height)
                    console.log(deltaX)
                    console.log(deltaY)
                  })}>
                </div>
              </div>
            </Draggable>
        ))}
      </div>
      <Draggable cancel=".Widget_pick" bounds="parent">
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
