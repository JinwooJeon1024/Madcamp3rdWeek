import { useRecoilState } from "recoil";
import "./EditPage.css";
import { WidgetListAtom, useWidgets } from "../recoil/WidgetList";
import { WidgetType } from "../types/Type";
import React from "react";
import TextWidget from "../widgets/customWidgets/TextWidget";
import Draggable, { DraggableData } from "react-draggable";

function EditMainPage() {
  const {widgets, addWidget} = useWidgets()

  function handleOnDragOver(event: React.DragEvent){
    event.preventDefault();
  }
  function handleOnNewWidgetDrop(event: React.DragEvent){
    //recoil에 추가
    const widgetType = event.dataTransfer.getData("widgetType") as WidgetType;
    switch(widgetType){
      case "TextWidget":
        console.log("Add new TextWidget")
        //TODO : 위젯 아이디 부여하는 거 바꿔야함
        //지우지 말 것, width와 height는 css 파일과 일치시켜야하고 px단위를 쓰도록 해야함
        const newTextWidget =(<TextWidget
                              widgetId={`TextWidget${widgets.length}`} 
                              widgetTopLeftX={0} 
                              widgetTopLeftY={0} 
                              width={100} 
                              height={100} 
                              text={"입력"}/>)
        addWidget(newTextWidget)
        break;
      default:
        break;
    } 
  }
  function handleMouseDown(){

  }
  // function handleWidgetPosition(event : React.MouseEvent, data : DraggableData){
  //   console.log(data.)
  // }


  //recoil에서 가져와서 뿌리기
  return (
    <div className="Whiteboard"
      onDrop={handleOnNewWidgetDrop}
      onDragOver={handleOnDragOver}>

      {widgets.map((widget, index) => (
          <Draggable 
            onMouseDown={handleMouseDown}
            >
            <div
              draggable
              key={index}>
              {widget}
            </div>
          </Draggable>
      ))}

    </div>
  );
}

export default EditMainPage;
