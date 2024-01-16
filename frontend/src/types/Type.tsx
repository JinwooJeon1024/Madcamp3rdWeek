export type WidgetType = "TextWidget" | "BookmarkWidget";

export type WigetCommon = {
  widgetId : string;
  widgetType : string
  widgetTopLeftX: number;
  widgetTopLeftY: number;
  width: number;
  height: number;
}

export type TextWidgetData = WigetCommon & {
  text : string;
}

export type BookmarkWidgetData = WigetCommon & {
  url: string;
}

export type ImageWidgetData = WigetCommon & {
  url : string;
}

export type WidgetData = TextWidgetData | ImageWidgetData;



