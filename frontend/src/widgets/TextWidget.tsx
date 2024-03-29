import { useEffect, useRef } from "react";
import { useWidgets } from "../recoil/WidgetList";
import { TextWidgetData } from "../types/Type";
import './Widget.css';

function TextWidget(textWidgetData: TextWidgetData) {
  const { updateText, updateSize } = useWidgets()
  function handleTextChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    //recoil 접근해서 text 변경
    console.log(event.target.value)
    console.log(`${textWidgetData.widgetId}`)
    updateText(textWidgetData.widgetId, event.target.value)
  }
  const textRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleResize = () => {
      if (textRef) {
        const rect = textRef.current?.getBoundingClientRect()
        updateSize(textWidgetData.widgetId, rect!!.width, rect!!.height)
      }

    }
    handleResize()
  }, [])

  return (
    <div
      ref={textRef}>
      <textarea
        className="Text"
        value={textWidgetData.text}
        onChange={handleTextChange}
        style={{
          width: textWidgetData.width,
          height: textWidgetData.height,
          fontSize : '16px'
        }} />
    </div>
  );
};

export default TextWidget;
