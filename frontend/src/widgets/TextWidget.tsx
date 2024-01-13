import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Draggable, { DraggableEventHandler } from 'react-draggable';

interface Position {
  x: number;
  y: number;
}

const TextWidget: React.FC = () => {
    const [text, setText] = useState<string>('여기에 입력하세요');
    const [position, setPosition] = useState<Position>({ x: 0, y: 0 });

    useEffect(() => {
        // 웹 시작 시 서버에서 위치 정보 불러오기
        fetchPosition();
    }, []);

    const fetchPosition = async () => {
        try {
            const response = await axios.get('http://143.248.196.71:5000/api/position/get');
            setPosition(response.data);
        } catch (error) {
            console.error('위치 정보를 불러오는 데 실패했습니다.', error);
        }
    };

    const handleTextChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        setText(event.target.value);
    };

    const handleStop: DraggableEventHandler = (e, data) => {
        // 드래그 종료 시 위치 저장
        const newPosition: Position = { x: data.x, y: data.y };
        setPosition(newPosition);
    };

    const handleSave = async () => {
        // 서버에 위치 정보 저장
        try {
            await axios.post('http://143.248.196.71:5000/api/position/save', position);
            console.log('위치 정보가 저장되었습니다.');
        } catch (error) {
            console.error('위치 정보 저장에 실패했습니다.', error);
        }
    };

    return (
        <Draggable position={position} onStop={handleStop}>
            <div className="text-widget">
                <input type="text" value={text} onChange={handleTextChange} />
                <button onClick={handleSave}>저장</button>
            </div>
        </Draggable>
    );
};

export default TextWidget;
