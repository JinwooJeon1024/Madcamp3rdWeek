export default function registerMouseDownDrag(
    onDragChange: (deltaX: number, deltaY: number) => void,
    stopPropagation?: boolean,
){
    return {
        onMouseDown:(clickEvent: React.MouseEvent<Element, MouseEvent>) =>{
        console.log('MouseEvent', clickEvent)
        if(stopPropagation) clickEvent.stopPropagation()
        const mouseMoveHandler = (moveEvent: MouseEvent) => {
            const deltaX = moveEvent.screenX-clickEvent.screenX;
            const deltaY = moveEvent.screenY-clickEvent.screenY;
            onDragChange(deltaX, deltaY)
        }
        const mouseUpHandler = () => {
            document.removeEventListener('mousemove', mouseMoveHandler)
        }
        document.addEventListener('mousemove', mouseMoveHandler)
        document.addEventListener('mouseup', mouseUpHandler, {once: true})
        }
    }
}