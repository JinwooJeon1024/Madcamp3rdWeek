import React, { ReactElement, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './EditPage.css';
import {DndProvider, useDrag, useDrop, XYCoord} from 'react-dnd';
import {HTML5Backend} from 'react-dnd-html5-backend'
import TextWidget from '../widgets/TextWidget';


const EditPage = () => {
  const navigate = useNavigate();
  const handlePreview = () => {
    navigate('/edit/preview');
  };
  //save nothing
  const handleCancel = () =>{
    navigate('/');
  };
  const [droppedWidgets, setDroppedWidgets] = useState<string[]>([]);
  const [widgetPosition, setWidgetPosition] = useState<XYCoord | null>(null);
  const [draggingWidget, setDraggingWidget] = useState<string | null>(null);
  const [widgetVisible, setWidgetVisible] = useState<boolean>(true);

  function handleOnDrag(e: React.DragEvent, widgetType: string){
    e.dataTransfer.setData("widgetType", widgetType);
  }
  function handleOnDrop(e: React.DragEvent){
    const widgetType = e.dataTransfer.getData("widgetType") as string;
    setDroppedWidgets([...droppedWidgets, widgetType]);
  }
  function handleDragOver(e: React.DragEvent){
    e.preventDefault();
  }

  return (
    <div>
      <DndProvider backend={HTML5Backend}>
        <div className="Container">
          <div className="Top">
            <div>a</div>
            <div>Edit User Information</div>
            <div className="Button_container">
              <button className="Right_button" onClick={handlePreview}>Preview</button>
              <button className="Left_button" onClick={handleCancel}>Don't save</button>
            </div>
          </div>
          <div className="Show_display">
            <div 
              className="Whiteboard" 
              id='Whiteboard'
              onDrop={handleOnDrop} 
              onDragOver={handleDragOver}>
              {/* <Whiteboard droppedComponents={droppedComponents} setDroppedComponents={setDroppedComponents}/> */}
              {droppedWidgets.map((widgetType, index) => {
                console.log(widgetType);
                let WidgetComponent : ReactElement | null = null;
                switch(widgetType){
                  case 'TextWidget' :
                    WidgetComponent = (
                      <TextWidget />);
                    console.log("switch-case textwidget");
                    break;
                  case 'WeatherWidget' :
                    WidgetComponent = <TextWidget/>; 
                    break;
                  default:
                    WidgetComponent = <div>Default</div>;
                }
                return (
                  <div className="dropped-widget" key={index}>
                    {WidgetComponent}  
                  </div>
                );
              })}
            </div>
          </div>
          <div className="Menu">
            <div className="Scroll">
              <div 
                draggable
                onDragStart={(e) => handleOnDrag(e, 'TextWidget')}>
                <img src={process.env.PUBLIC_URL + "/view1.png"} alt ="TextWidget"/>
              </div>
              <div 
                draggable
                onDragStart={(e) => handleOnDrag(e, 'WeatherWidget')}>
                <img src={process.env.PUBLIC_URL + "/view1.png"} alt ="ImageWidget"/>
              </div>
            </div>
          </div>
        </div>
      </DndProvider>
    </div>  
  );
};


export default EditPage;

