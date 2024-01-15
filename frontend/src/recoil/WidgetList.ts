import {atom, useRecoilState} from 'recoil';
import { ReactElement } from 'react';
import React from 'react';

export const WidgetListAtom = atom<ReactElement[]>({
    key: 'WidgetList',
    default : []
})

export const useWidgets = () => {
    const [widgets, setWidgets] = useRecoilState(WidgetListAtom)

    const addWidget = (newWidget : ReactElement) => {
        setWidgets((prevWidgest) => [...prevWidgest, newWidget])
    }
    
    const updateText = (widgetId : string, newText : string) =>{
        setWidgets((prevWidgets) => 
            prevWidgets.map((widget) => 
            widget.props.widgetId === widgetId ? React.cloneElement(widget, {text : newText})
                : widget))
    }

    const updateBoomark = (widgetId : string, newUrl : string, newIcon : string) => {
        // setWidgets((prevWidgets) => 
        // )
    }

    const removeWidget = (widgetId : string) => {
        console.log(`remove widgetid : ${widgetId}`)
        console.log(`remove 이전 : ${widgets}`)
        setWidgets((prevWidgets) => prevWidgets.filter((widget) => widget.props.widgetId !== widgetId))
        console.log(`remove 이후 : ${widgets}`)
    }

    return {widgets, addWidget, updateText, removeWidget}
}


