export type WidgetType = "TextWidget" | "BookmarkWidget";

export interface WigetCommon = {
  widgetId : string;
  widgetType : string
  widgetTopLeftX: number;
  widgetTopLeftY: number;
  width: number;
  height: number;
}

export interface TextWidgetData = WigetCommon & {
  text : string;
}

export type BookmarkWidgetData = WigetCommon & {
  url: string;
  icon: string;
}

export interface ImageWidgetData = WigetCommon & {
  url : string;
}

export type WidgetData = TextWidgetData | ImageWidgetData;



