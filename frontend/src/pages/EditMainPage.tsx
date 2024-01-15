
import "./EditPage.css";
import { useWidgets } from "../recoil/WidgetList";
import { WidgetType } from "../types/Type";
import React, { useEffect, useRef } from "react";
import TextWidget from "../widgets/customWidgets/TextWidget";
import Draggable, { DraggableData, DraggableEvent } from "react-draggable";
import axios, { AxiosError } from "axios";
import { useEditSize } from "../recoil/EditSize";

function EditMainPage() {
  const {widgets, addWidget, updatePosition} = useWidgets()
  const {left, top, setLeft, setTop} = useEditSize()
  const editRef = useRef<HTMLDivElement>(null)

  useEffect(()=>{
    const handleEditResize=()=>{
      if(editRef.current){
        const rect = editRef.current.getBoundingClientRect();
        setLeft(rect.left)
        setTop(rect.top)
        console.log(rect.left)
        console.log(rect.top)
      }
    }
    handleEditResize();
    console.log(editRef.current)
    window.addEventListener('resize', handleEditResize)
    return () =>{
      window.removeEventListener('resize', handleEditResize)
    }
  },[]);


  function handleOnDragOver(event: React.DragEvent){
    event.preventDefault();
  }
  // function handleOnNewWidgetDrop(event: React.DragEvent) {
  //   //recoil에 추가
  //   const widgetType = event.dataTransfer.getData("widgetType") as WidgetType;
  //   switch (widgetType) {
  //     case "TextWidget": {
  //       console.log("Add new TextWidget");
  //       const newTextWidget = (
  //         <TextWidget
  //           widgetId={`TextWidget${widgets.length}`}
  //           widgetTopLeftX={0}
  //           widgetTopLeftY={0}
  //           width={100}
  //           height={100}
  //           text={"입력"}
  //         />
  //       );
  //       addWidget(newTextWidget);
  //       break;
  //     }
  //     case "BookmarkWidget":
  //       console.log("Add new BookmarkWidget");
  //       const newBookmarkWidget = (
  //         <BookmarkWidget
  //           widgetId={`TextWidget${widgets.length}`}
  //           widgetTopLeftX={0}
  //           widgetTopLeftY={0}
  //           width={100}
  //           height={100}
  //           url = ''
  //           icon = ''
  //         />
  //       );
  //       addWidget(newBookmarkWidget);
  //       break;
  //     default:
  //       // ...
  //       break;
  //   }
  // }
  function handleMouseDown() {}
  // function handleWidgetPosition(event : React.MouseEvent, data : DraggableData){
  //   console.log(data.)
  // }

  //recoil에서 가져와서 뿌리기
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
                                widgetTopLeftX={response.data.data.x-left} 
                                widgetTopLeftY={response.data.data.y-top} 
                                width={response.data.data.width} 
                                height={response.data.data.height} 
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
  function handlePosition(data: DraggableData, widgetId : string){
    updatePosition(widgetId, data)
  }


  return (
    <div className="Whiteboard" ref = {editRef}
      onDrop={handleOnNewWidgetDrop}
      onDragOver={handleOnDragOver}
    >
      {widgets.map((widget) => (
        <Draggable
          key={widget.props.widgetId}
          onStop={(event, data) => handlePosition(data, widget.props.widgetId)}
          defaultPosition={{x: widget.props.widgetTopLeftX, y: widget.props.widgetTopLeftY}}
          bounds="parent">
          <div
            style={{position:'fixed'}}>
            {widget}
          </div>
        </Draggable>
      ))}
    </div>
  );
}

export default EditMainPage;
