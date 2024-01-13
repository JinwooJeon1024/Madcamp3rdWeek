import React, { useState } from 'react';
import { useDrag } from 'react-dnd';

const TextWidget: React.FC<{ position: { x: number; y: number } }> = ({ position }) => {
    const [text, setText] = useState('여기에 입력하세요');

    const [{ isDragging }, dragRef] = useDrag(() => ({
        type: "widget",
        item: { id: 'text-widget' },
        collect: monitor => ({
            isDragging: !!monitor.isDragging(),
        }),
    }));

    const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setText(event.target.value);
    };

    return (
        <div 
            ref={dragRef} 
            className="text-widget" 
            style={{ 
                opacity: isDragging ? 0.5 : 1,
                position: 'absolute',
                left: position.x,
                top: position.y
            }}
        >
            <input type="text" value={text} onChange={handleTextChange} />
        </div>
    );
};

export default TextWidget;
