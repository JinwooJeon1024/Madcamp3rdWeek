import { ID_Delete_props, TextWidgetData } from "../../types/Type";
import { Widget, useWidgetData } from "../WidgetHooks";
const TextWidget = ({ id }: ID_Delete_props) => {
  const { widgetData, setWidgetData } = useWidgetData<TextWidgetData>(id, {
    type: "TextWidget",
    position: { x: 0, y: 0 },
    text: "",
  });
  function onDeleteButtonClick(){
    onWidgetDeleteButtonClick(id);
  }
  return (
    <Widget widgetData={widgetData} setWidgetData={setWidgetData}>
      <div className="text-widget">
        <input
          type="text"
          value={widgetData.text}
          onChange={(event) => {
            setWidgetData({
              ...widgetData,
              text: event.target.value,
            });
          }}
        />
        <button onClick={onDeleteButtonClick}>삭제</button>
      </div>
    </Widget>
  );
};

export default TextWidget;
