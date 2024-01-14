import Draggable, { DraggableEventHandler } from "react-draggable";
import { WidgetData, WidgetProps } from "../types/Type";

const Widget = <T extends WidgetData>({
  widgetData,
  setWidgetData,
  children,
}: WidgetProps<T>) => {
  const handleDragStop: DraggableEventHandler = (e, data) => {
    setWidgetData({
      ...widgetData,
      position: { x: data.x, y: data.y },
    });
  };

  return (
    <Draggable onStop={handleDragStop}>
      <div>{children}</div>
    </Draggable>
  );
};

export default Widget; 