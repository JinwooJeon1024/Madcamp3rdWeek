import React, { ReactElement, useState } from "react";
import { useNavigate } from "react-router-dom";
import { WidgetType } from "../types/Type";
import "./EditPage.css";
import { useWidgets } from "../recoil/WidgetList";
import WIDGET_MENU from "../widgets/WidgetMenu";
import Draggable, { DraggableData } from "react-draggable";
import axios, { AxiosError } from "axios";
import TextWidget from "../widgets/customWidgets/TextWidget";
import registerMouseDownDrag from "../services/registerMouseDownDrag";

const EditPage = () => {
  const {widgets, prevWidgets, addWidget, updatePosition, updateSize} = useWidgets()
  const [rightImgError, setRightImgError] = useState<boolean>(false)
  const [leftImgError, setLeftImgError] = useState<boolean>(false)
  console.log(widgets.map((widget)=>widget.props));
  const navigate = useNavigate();

  async function sendWidgets(sendRequest : ReactElement[]){
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

  function handleDone() {
    sendWidgets(widgets)
  }
  function handleCancel() {
    // TODO : 디비로 처음 fetch받은 내용 보내기
    sendWidgets(prevWidgets)
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
  function handleLeftImgError(event: React.SyntheticEvent<HTMLImageElement, Event>){
    setLeftImgError(true)
  }
  function handleRightImgError(event: React.SyntheticEvent<HTMLImageElement, Event>){
    setRightImgError(true)
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
          const newTextWidget =(<TextWidget
                                widgetId={response.data.data._id} 
                                widgetTopLeftX={mouseX} 
                                widgetTopLeftY={mouseY} 
                                width={0} 
                                height={0} 
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
                  {...registerMouseDownDrag((deltaX, deltaY)=>{
                    updateSize(widget.props.widgetId,deltaX+widget.props.width, deltaY+widget.props.height)
                    console.log('deltaX', deltaX)
                    console.log('deltaY',deltaY)
                    console.log('widgetId', widget.props.widgetId)
                  })}>
                </div>
              </div>
            </Draggable>
        ))}
      </div>
      <Draggable cancel=".Widget_pick" bounds="parent">
          <div className="Menu">
            {WIDGET_MENU.map(({ type, image }) => (
              <div>
                <img className="Widget_pick" src={image} alt={type}
                      draggable
                      onDragStart={(event) => handleOnDragStart(event, type)}/>
              </div>
            ))}
            
          </div>
      </Draggable>
      <button className="Right_Top_Component" onClick={handleDone}>
        {!rightImgError? 
         (<img src="" alt="SAVE" onError={handleRightImgError}/>)
        : (<p>SAVE</p>)}
      </button>
      <button className="Left_Top_Component" onClick={handleCancel}>
        {!leftImgError? 
         (<img src="" alt="DISCARD" onError={handleLeftImgError}/>)
        : (<p>DISCARD</p>)}
      </button>
    </div>
  );
};

export default EditPage;
