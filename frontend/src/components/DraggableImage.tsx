import { useState } from "react";



export const DraggableImage: React.FC = () =>{
    const [dragging, setDragging] = useState(false);
    const [dropped, setDropped] = useState(false);
    const [droppable, setDroppable] = useState(false);
    const [position, setPosition] = useState<{x: number; y:number}>({x:0, y:0});
  
    const handleDragStart = (e:React.DragEvent<HTMLImageElement>) => {
      setDragging(true);
      setDropped(false);
      setDroppable(false);
    };
    const handleDragEnd = (e:React.DragEvent<HTMLImageElement>) => {
      if(droppable){
        console.log("It's on Drop zone");
      }
    };
    const handleDragOver = (e:React.DragEvent<HTMLImageElement>) =>{
        setDroppable(true);
    };
    const handleDrag = (e:React.DragEvent<HTMLImageElement>)=>{
        if(dragging){
            setPosition({
                x : e.clientX,
                y : e.clientY,
            });
        }
    };
    const handleDrop = (e:React.DragEvent<HTMLImageElement>)=>{
        setDragging(false);
        setDropped(true);
    };
    return (
        <div>
            <img 
                src={process.env.PUBLIC_URL + "/view1.png"} 
                alt="text"
                draggable
                onDrag={handleDrag}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                style={{
                    position: 'fixed',
                    left:'${position.x}px',
                    top: '${position.y}px',
                }}
            />
            {dragging && (
                <img 
                    src={process.env.PUBLIC_URL + "/view1.png"} 
                    alt="text"
                    draggable
                    onDrag={handleDrag}
                    onDragStart={handleDragStart}
                    onDragEnd={handleDragEnd}
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                    style={{
                        position: 'fixed',
                        left:'${position.x}px',
                        top: '${position.y}px',
                        opacity: dragging? 0.7 : 1,
                    }}
                />
            )}
        </div>
            
    );
    
};