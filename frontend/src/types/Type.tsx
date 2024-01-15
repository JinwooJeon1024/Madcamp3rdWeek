export type WidgetType = "TextWidget" | "BookmarkWidget";

export type WigetCommon = {
  widgetId : string;
  widgetTopLeftX: number;
  widgetTopLeftY: number;
  width: number;
  height: number;
}

export type TextWidgetData = WigetCommon & {
  text : string;
  //TODO : text 색상
}

export type BookmarkWidgetData = WigetCommon & {
  url: string;
  icon: string;
}

export type ImageWidgetData = WigetCommon & {
  url : string;
}

export type WidgetData = TextWidgetData | ImageWidgetData;



