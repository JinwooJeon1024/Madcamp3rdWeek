import React from "react";
import { useNavigate } from "react-router-dom";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { WidgetType } from "../types/Type";
import "./EditPage.css";
import EditMainPage from "./EditMainPage";
import { useWidgets } from "../recoil/WidgetList";
import WIDGET_MENU from "../widgets/WidgetMenu";

const EditPage = () => {
  // const { widgets, addWidget, deleteWidget } = useWidgetList();
  const {widgets} = useWidgets()
  console.log(widgets);

  const navigate = useNavigate();
  function handleDone() {
    navigate("/main");
  }

  function handleCancel() {
    // TODO : 디비로 변경사항 전송 X
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

  function handleOnDragStart(event: React.DragEvent, widgetType: WidgetType) {
    event.dataTransfer.setData("widgetType", widgetType);
  };


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
              <EditMainPage />
          </div>
          <div className="Menu">
            <div className="Scroll">
              {WIDGET_MENU.map(({ type, image }) => (
                <div
                  draggable
                  onDragStart={(event) => handleOnDragStart(event, type)}>
                  <img src={image} alt={type} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </DndProvider>
    </div>
  );
};

export default EditPage;
