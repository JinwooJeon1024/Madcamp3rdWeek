export type WidgetType = "TextWidget";

export type EditMainPageProps = {
    widgets: React.ReactElement[];
    onDragDrop: (event: React.DragEvent) => void;
    onDelete: (event : React.MouseEvent<HTMLButtonElement>) => void;
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

export type ID_Delete_props = {
  //id와 widgetId의 type은 같아야함
  id: number;
  deleteButton : (widgetId : number) => void;
};