import React, { useEffect, useRef } from 'react';
import { useWidgets } from '../recoil/WidgetList';
import { ImageWidgetData } from '../types/Type';
import './Widget.css';

const ImageWidget = (imageWidgetData: ImageWidgetData) => {
  const { updateImage, updateSize } = useWidgets();
  const imageRef = useRef<HTMLDivElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        if (e.target?.result) {
          const newImageUrl = e.target.result as string;
          updateImage(imageWidgetData.widgetId, newImageUrl);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      if (imageRef) {
        updateSize(imageWidgetData.widgetId, 180, 30)
      }
    }
    handleResize()
  }, [])

  return (
    <div
      ref={imageRef}
      style={{
        width: imageWidgetData.width,
        height: imageWidgetData.height
      }}
    >
      {!imageWidgetData.url && (
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          style={{
            width: '100%',
            height: '100%',
          }}
        />
      )}
      {imageWidgetData.url && (
        <img
          className="Image_widget"
          draggable="false"
          src={imageWidgetData.url} 
          alt="Widget"
          style={{
            width: '100%',
            height: '100%'
          }}
        />
      )}
    </div>
  );
};

export default ImageWidget;
