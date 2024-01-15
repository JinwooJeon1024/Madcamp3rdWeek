import { WidgetType } from "../types/Type";

const WIDGET_MENU: { type: WidgetType; image: string }[] = [
  {
    type: "TextWidget",
    image: process.env.PUBLIC_URL + "/view1.png",
  },
  {
    type: "BookmarkWidget",
    image: process.env.PUBLIC_URL + "/view1.png",
  },
];

export default WIDGET_MENU;
