import { WidgetType } from "../types/Type";

const WIDGET_MENU: { type: WidgetType; image: string }[] = [
  {
    type: "TextWidget",
    image: process.env.PUBLIC_URL + "/text.png",
  },
  {
    type: "BookmarkWidget",
    image: process.env.PUBLIC_URL + "/bookmark.png",
  },
  {
    type: "ClockWidget",
    image: process.env.PUBLIC_URL + "/clock.png",
  },
  {
    type: "SearchWidget",
    image: process.env.PUBLIC_URL + "/search.png"
  },
  {
    type: "ImageWidget",
    image: process.env.PUBLIC_URL + "/image.png"
  }

];

export default WIDGET_MENU;
