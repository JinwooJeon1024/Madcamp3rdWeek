import { useEffect, useRef, useState } from "react";
import { useWidgets } from "../recoil/WidgetList";
import { ClockWidgetData } from "../types/Type";

function ClockWidget(clockWidgetData: ClockWidgetData) {
  const { updateSize } = useWidgets()
  const [currentTime, setCurrentTime] = useState<string>('')

  const clockRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleResize = () => {
      if (clockRef) {
        const rect = clockRef.current?.getBoundingClientRect()
        updateSize(clockWidgetData.widgetId, rect!!.width, rect!!.height)
      }
    }
    handleResize()
  }, [])

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      setCurrentTime(`${hours}:${minutes}`)
    }
    const intervalId = setInterval(updateClock, 1000)
    return () => clearInterval(intervalId)
  }, [])

  const calSize = () => {
    const whichSide = Math.min(clockWidgetData.width / 2.5, clockWidgetData.height)
    const fontSize = Math.min(whichSide, 200);
    return {
      width: `${clockWidgetData.width}px`,
      height: `${clockWidgetData.height}px`,
      fontSize: `${fontSize}px`,
    }
  }



  return (
    <div
      ref={clockRef}>
      <div className="Clock" style={calSize()}>{currentTime}</div>
    </div>
  );
};

export default ClockWidget;
