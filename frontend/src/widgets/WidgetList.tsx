import { WidgetType } from "../types/Type";

const WIDGET_LIST: { type: WidgetType; image: string }[] = [
  {
    type: "TextWidget",
    image: process.env.PUBLIC_URL + "/view1.png",
  },
];

export default WIDGET_LIST;
