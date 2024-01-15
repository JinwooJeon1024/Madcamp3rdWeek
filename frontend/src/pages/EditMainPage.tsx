import { useRecoilState } from "recoil";
import "./EditPage.css";
import { WidgetListAtom, useWidgets } from "../recoil/WidgetList";
import { WidgetType } from "../types/Type";
import React from "react";
import TextWidget from "../widgets/customWidgets/TextWidget";
import Draggable, { DraggableData } from "react-draggable";
import BookmarkWidget from "../widgets/customWidgets/BookmarkWidget";

function EditMainPage() {
  const { widgets, addWidget } = useWidgets();

  function handleOnDragOver(event: React.DragEvent) {
    event.preventDefault();
  }
  function handleOnNewWidgetDrop(event: React.DragEvent) {
    //recoil에 추가
    const widgetType = event.dataTransfer.getData("widgetType") as WidgetType;
    switch (widgetType) {
      case "TextWidget": {
        console.log("Add new TextWidget");
        const newTextWidget = (
          <TextWidget
            widgetId={`TextWidget${widgets.length}`}
            widgetTopLeftX={0}
            widgetTopLeftY={0}
            width={100}
            height={100}
            text={"입력"}
          />
        );
        addWidget(newTextWidget);
        break;
      }
      case "BookmarkWidget":
        console.log("Add new BookmarkWidget");
        const newBookmarkWidget = (
          <BookmarkWidget
            widgetId={`TextWidget${widgets.length}`}
            widgetTopLeftX={0}
            widgetTopLeftY={0}
            width={100}
            height={100}
            url = ''
            icon = ''
          />
        );
        addWidget(newBookmarkWidget);
        break;
      default:
        // ...
        break;
    }
  }
  function handleMouseDown() {}
  // function handleWidgetPosition(event : React.MouseEvent, data : DraggableData){
  //   console.log(data.)
  // }

  //recoil에서 가져와서 뿌리기
  return (
    <div
      className="Whiteboard"
      onDrop={handleOnNewWidgetDrop}
      onDragOver={handleOnDragOver}
    >
      {widgets.map((widget, index) => (
        <Draggable onMouseDown={handleMouseDown}>
          <div
            draggable
            style={{
              position: "absolute",
              top: `${widget.props.widgetTopLeftX}`,
              left: `${widget.props.widgetTopLeftY}`,
              width: `${widget.props.width}`,
              height: `${widget.props.height}`,
            }}
            key={index}
          >
            {widget}
          </div>
        </Draggable>
      ))}
    </div>
  );
}

export default EditMainPage;
