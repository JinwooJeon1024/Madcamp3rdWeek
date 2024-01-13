import React, { useState } from 'react';
import Draggable from 'react-draggable';

const TextWidget = () => {
    const [text, setText] = useState('여기에 입력하세요');

    const handleTextChange = (event : any) => {
        setText(event.target.value);
    };

    return (
        <Draggable>
            <div className="text-widget">
                <input type="text" value={text} onChange={handleTextChange} />
            </div>
        </Draggable>
    );
};

export default TextWidget;
