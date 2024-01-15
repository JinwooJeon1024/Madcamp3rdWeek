import { IDprops, TextWidgetData } from "../../types/Type";
import Widget from "../Widget";
import useWidgetData from "../widgetHooks/UseWidgetData";

const TextWidget = ({ id }: IDprops) => {
  const { widgetData, setWidgetData } = useWidgetData<TextWidgetData>(id, {
    type: "TextWidget",
    position: { x: 0, y: 0 },
    text: "",
  });

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
      </div>
    </Widget>
  );
};

export default TextWidget;
