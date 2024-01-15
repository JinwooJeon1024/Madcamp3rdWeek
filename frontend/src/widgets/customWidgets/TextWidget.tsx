import { useWidgets } from "../../recoil/WidgetList";
import { TextWidgetData } from "../../types/Type";

function TextWidget(textWidgetData : TextWidgetData){
  const {updateText, removeWidget} = useWidgets()
  function onDeleteButtonClick(){
    console.log(`text delete clicked, delete ${textWidgetData.widgetId}`)
    removeWidget(textWidgetData.widgetId)
  }
  function handleTextChange(event:React.ChangeEvent<HTMLInputElement>){
    //recoil 접근해서 text 변경
    console.log(event.target.value)
    console.log(`${textWidgetData.widgetId}`)
    updateText(textWidgetData.widgetId, event.target.value)
  }
  return (
    <div className="text-widget">
      <input
        type="text"
        value={textWidgetData.text}
        onChange={handleTextChange}
      />
      <button onClick={onDeleteButtonClick}>삭제</button>
    </div>
  );
};

export default TextWidget;
