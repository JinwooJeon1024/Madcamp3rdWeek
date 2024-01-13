import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './EditPage.css';
import { DraggableImage } from '../components/DraggableImage';
import EditWindow from '../components/EditWindow';
import {DndProvider} from 'react-dnd';
import {HTML5Backend} from 'react-dnd-html5-backend'




const EditPage = () => {
  const navigate = useNavigate();

  const handlePreview = () => {
    navigate('/edit/preview');
  };
  //save nothing
  const handleCancel = () =>{
    navigate('/');
  };
  const handleDrop = (imageId: string, dropTarget: string) =>{
    console.log("Imgae ${imageId} dropped on ${dropTarget}");
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="Container">
        <div className="Top">
          <div>a</div>
          <div>Edit User Information</div>
          <div className="Button_container">
            <button className="Right_button" onClick={handlePreview}>Preview</button>
            <button className="Left_button" onClick={handleCancel}>Don't save</button>
          </div>
        </div>
        <div className="DropWindow">
          <EditWindow onDrop={handleDrop}/>
        </div>
        <div className="Menu">
          <div className="Scroll">
            <DraggableImage />
          </div>
        </div>
      </div>
    </DndProvider>
  );
};


export default EditPage;

