import TextWidget from "./customWidgets/TextWidget";
import { WidgetType } from "../types/Type";

const WIDGET_TO_COMPONENT: Record<WidgetType, React.FC<{ id: number }>> = {
  TextWidget: TextWidget,
};

export default WIDGET_TO_COMPONENT;
