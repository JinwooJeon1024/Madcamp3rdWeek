import { useEffect, useRef } from "react";
import { useWidgets } from "../../recoil/WidgetList";
import { TextWidgetData } from "../../types/Type";

function TextWidget(textWidgetData : TextWidgetData){
  const {updateText, removeWidget, updateSize} = useWidgets()
  function onDeleteButtonClick(event: React.MouseEvent<HTMLButtonElement>){
    console.log(`text delete clicked, delete ${textWidgetData.widgetId}`)
    removeWidget(textWidgetData.widgetId)
  }
  function handleTextChange(event:React.ChangeEvent<HTMLInputElement>){
    //recoil 접근해서 text 변경
    console.log(event.target.value)
    console.log(`${textWidgetData.widgetId}`)
    updateText(textWidgetData.widgetId, event.target.value)
  }
  const textRef = useRef<HTMLDivElement>(null)

  useEffect(()=>{
    const handleResize=()=>{
      if(textRef){
        const rect = textRef.current?.getBoundingClientRect()
        updateSize(textWidgetData.widgetId, rect!!.width, rect!!.height)
      }
    
    }
    handleResize()
  },[])


  return (
      <div 
        ref={textRef}>
        <input
          type="text"
          value={textWidgetData.text}
          onChange={handleTextChange}
          style={{width : textWidgetData.width,
                  height : textWidgetData.height}}/>
        <button type= "button" onClick={onDeleteButtonClick}>삭제</button>
      </div>
  );
};

export default TextWidget;
