import React, { useState } from 'react';

const TextWidget: React.FC = () => {
    const [text, setText] = useState('여기에 입력하세요');

    const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setText(event.target.value);
    };

    return (
        <div className="text-widget">
            <input type="text" value={text} onChange={handleTextChange} />
            <p>{text}</p>
        </div>
    );
};

export default TextWidget;
