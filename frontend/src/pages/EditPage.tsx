import React, { ReactElement, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./EditPage.css";
import { DndProvider, useDrag, useDrop, XYCoord } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import TextWidget from "../widgets/TextWidget";
import MainPage from "./MainPage";

type WidgetType = "TextWidget" | "WeatherWidget";

const WIDGET_TO_COMPONENT: Record<WidgetType, React.FC<{ id: number }>> = {
  TextWidget: TextWidget,
  WeatherWidget: TextWidget,
};

const WIDGET_LIST: { type: WidgetType; image: string }[] = [
  {
    type: "TextWidget",
    image: process.env.PUBLIC_URL + "/view1.png",
  },
  {
    type: "WeatherWidget",
    image: process.env.PUBLIC_URL + "/view2.png",
  },
];

const EditPage = () => {
  const navigate = useNavigate();
  function handleDone(){
    navigate("/main");
  };

  function handleCancel(){
    //TODO : EditPage 들어오기 전 상태로 revert
  }

  const [widgets, setWidgets] = useState<ReactElement[]>([]);

  // const { widgetList, addWidget } = useWidgetList();

  // setWidgets로 변경 해야함

  // function handleOnDrag(e: React.DragEvent, widgetType: string){
  //   e.dataTransfer.setData("widgetType", widgetType);
  // }
  // function handleOnDrop(e: React.DragEvent){
  //   const widgetType = e.dataTransfer.getData("widgetType") as string;
  //   setDroppedWidgets([...droppedWidgets, widgetType]);
  // }
  // function handleDragOver(e: React.DragEvent){
  //   e.preventDefault();
  // }

  function handleOnDrag(event: React.DragEvent, widgetType: WidgetType) {
    event.dataTransfer.setData("widgetType", widgetType);
  }

  function handleOnDrop(event: React.DragEvent) {
    const widgetType = event.dataTransfer.getData("widgetType") as WidgetType;
    const widgetComponent = WIDGET_TO_COMPONENT[widgetType];

    const widgetElement = React.createElement(widgetComponent);
    setWidgets([...widgets, widgetElement]);
  }

  return (
    <div>
      <DndProvider backend={HTML5Backend}>
        <div className="Container">
          <div className="Top">
            <div>a</div>
            <div>Edit User Information</div>
            <div className="Button_container">
              <button className="Right_button" onClick={handleDone}>
                완료
              </button>
              <button className="Left_button" onClick={handleCancel}>
                변경 사항 취소
              </button>
            </div>
          </div>
          <div className="Show_display">
            <MainPage widgets={widgets} onDragDrop={handleOnDrop} />
          </div>
          <div className="Menu">
            <div className="Scroll">
              {WIDGET_LIST.map(({ type, image }) => (
                <div draggable onDragStart={(event) => handleOnDrag(event, type)}>
                  <img src={image} alt={type} />
                </div>
              ))}
              {/* <div 
                draggable
                onDragStart={(e) => handleOnDrag(e, 'TextWidget')}>
                <img src={process.env.PUBLIC_URL + "/view1.png"} alt ="TextWidget"/>
              </div>
              <div 
                draggable
                onDragStart={(e) => handleOnDrag(e, 'WeatherWidget')}>
                <img src={process.env.PUBLIC_URL + "/view1.png"} alt ="ImageWidget"/>
              </div> */}
            </div>
          </div>
        </div>
      </DndProvider>
    </div>
  );
};

export default EditPage;
