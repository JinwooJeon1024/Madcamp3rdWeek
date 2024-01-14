import React from 'react';
import {useDrop, DropTargetMonitor} from 'react-dnd';


interface DropAreaProps{
    onDrop: (imageId: string, dropTarget: string) => void;
}

const EditWindow: React.FC<DropAreaProps>=({onDrop})=>{
    const [{isOver}, drop] = useDrop({
        accept: 'IMAGE',
        drop: (item: {type: string; id: string}, monitor : DropTargetMonitor) => {
            const dropTarget = item.id;
            onDrop(item.id, dropTarget);
        },
        collect: (monitor) => ({
            isOver : !!monitor.isOver(),
        }),
    });
    return(
        <div
            ref={drop}
            style={{
                border: isOver? '2px dashed red' : '2px dashed black',
                width:'300px',
                height:'300px',
                background: 'white'
            }}>
            Drop HERE
        </div>
    );
};
export default EditWindow;