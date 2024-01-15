import {atom, useRecoilState} from 'recoil';
import { ReactElement } from 'react';
import React from 'react';
import { DraggableData } from 'react-draggable';



export const WidgetListAtom = atom<ReactElement[]>({
    key: 'WidgetList',
    default : []
})

export const useWidgets = () => {
    const [widgets, setWidgets] = useRecoilState(WidgetListAtom)

    const addWidget = (newWidget : ReactElement) => {
        setWidgets((prevWidgest) => [...prevWidgest, newWidget]) 
    };
    
    const updateText = (widgetId : string, newText : string) =>{
        setWidgets((prevWidgets) => 
            prevWidgets.map((widget) => 
            widget.props.widgetId === widgetId ? React.cloneElement(widget, {text : newText})
                : widget))
    };

    const removeWidget = (widgetId : string) => {
        console.log(`remove widgetid : ${widgetId}`)
        console.log(`remove 이전 : ${widgets}`)
        // const removedList : ReactElement[] = []
        // for(const widget of widgets){
        //     if(widget.props.widgetId !== widgetId){
        //         console.log(`${widget.props.widgetId}`)
        //         removedList.push(widget)
        //     }
        // }
        // setWidgets(removedList)
        setWidgets((prevWidgets) => prevWidgets.filter((widget) => widget.props.widgetId !== widgetId))
    };

    const updatePosition = (widgetId: string, positionData: DraggableData) => {
        setWidgets((prevWidgets) => 
            prevWidgets.map((widget) => 
            widget.props.widgetId === widgetId ? React.cloneElement(
                                                                widget, 
                                                                {widgetTopLeftX: positionData.x,
                                                                widgetTopLeftY: positionData.y})
                : widget))
        console.log(positionData.x)
        console.log(positionData.y)
    }

    return {widgets, setWidgets, addWidget, removeWidget, updatePosition, updateText }
}


