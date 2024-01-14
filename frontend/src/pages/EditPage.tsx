import React from "react";
import { useNavigate } from "react-router-dom";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import WIDGET_LIST from "../widgets/WidgetList";
import WIDGET_TO_COMPONENT from "../widgets/WidgetMapping";
import { useWidgetList } from "../widgets/WidgetHooks";
import { WidgetType } from "../types/Type";
import "./EditPage.css";
import EditMainPage from "./EditMainPage";

const EditPage = () => {
  const { widgets, addWidget, deleteWidget } = useWidgetList();

  const navigate = useNavigate();
  function handleDone() {
    navigate("/main");
  }

  function handleCancel() {
    // TODO : EditPage 들어오기 전 상태로 revert
  }

  // const [widgets, setWidgets] = useState<ReactElement[]>([]);

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
    // setWidgets([...widgets, widgetElement]);
    // addWidget(widgetElement);
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
            <EditMainPage widgets={widgets} onDragDrop={handleOnDrop} />
          </div>
          <div className="Menu">
            <div className="Scroll">
              {WIDGET_LIST.map(({ type, image }) => (
                <div
                  draggable
                  onDragStart={(event) => handleOnDrag(event, type)}
                >
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