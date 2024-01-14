export type WidgetType = "TextWidget";

export type EditMainPageProps = {
    widgets: React.ReactElement[];
    onDragDrop: (event: React.DragEvent) => void;
}

export type WidgetData = {
  position: { x: number; y: number };
  // size
  // color(style)
};

export type WidgetProps<T extends WidgetData> = {
  children: React.ReactNode;
  widgetData: T;
  setWidgetData: (data: T) => void;
};

export type TextWidgetData = WidgetData & {
  type: "TextWidget";
  text: string;
};

export type IDprops = {
  id: number;
};
