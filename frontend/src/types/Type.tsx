export type WidgetType = "TextWidget" | "BookmarkWidget" | "ClockWidget" | "SearchWidget";

export type WidgetCommon = {
  widgetId: string;
  widgetType: string;
  widgetTopLeftX: number;
  widgetTopLeftY: number;
  width: number;
  height: number;
}

export type TextWidgetData = WidgetCommon & {
  text : string;
}

export type BookmarkWidgetData = WidgetCommon & {
  url: string;
  icon: string
}

export type ImageWidgetData = WidgetCommon & {
  url : string;
}

export type SearchWidgetData = WidgetCommon & {
  search: string;
}

export type WidgetData = TextWidgetData | ImageWidgetData | BookmarkWidgetData | SearchWidgetData;
