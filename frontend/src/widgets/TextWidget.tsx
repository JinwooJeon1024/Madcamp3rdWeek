import React, { useState, useEffect } from 'react';
import Draggable, { DraggableEventHandler } from 'react-draggable';

interface Position {
  x: number;
  y: number;
}

const TextWidget: React.FC = () => {
    const [text, setText] = useState<string>('여기에 입력하세요');
    const [position, setPosition] = useState<Position>({ x: 0, y: 0 });

    useEffect(() => {
        // 로컬 스토리지에서 위치 정보 불러오기
        const savedPosition = localStorage.getItem('textWidgetPosition');
        if (savedPosition) {
            setPosition(JSON.parse(savedPosition));
        }
    }, []);

    const handleTextChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        setText(event.target.value);
    };

    const handleStop: DraggableEventHandler = (e, data) => {
        // 드래그 종료 시 위치 저장
        const newPosition: Position = { x: data.x, y: data.y };
        setPosition(newPosition);
        localStorage.setItem('textWidgetPosition', JSON.stringify(newPosition));
    };

    return (
        <Draggable position={position} onStop={handleStop}>
            <div className="text-widget">
                <input type="text" value={text} onChange={handleTextChange} />
            </div>
        </Draggable>
    );
};

export default TextWidget;
