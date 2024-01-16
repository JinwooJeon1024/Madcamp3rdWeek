import React from 'react';
import { useWidgets } from "../../recoil/WidgetList";
import { BookmarkWidgetData } from "../../types/Type";

const BookmarkWidget = (bookmarkWidgetData : BookmarkWidgetData) => {
  const { updateBookmark, removeWidget } = useWidgets();

  function onDeleteButtonClick() {
    console.log(`Bookmark delete clicked, delete ${bookmarkWidgetData.widgetId}`);
    removeWidget(bookmarkWidgetData.widgetId);
  }

  function handleUrlChange(event: React.ChangeEvent<HTMLInputElement>) {
    const newUrl = event.target.value;
    console.log(newUrl);
    console.log(`${bookmarkWidgetData.widgetId}`);

    updateBookmark(bookmarkWidgetData.widgetId, newUrl);
  }

  function handleIconClick() {
    if (bookmarkWidgetData.url) {
      window.location.href = bookmarkWidgetData.url;
    }
  }

  function handleKeyPress(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter' && bookmarkWidgetData.url) {
      window.location.href = bookmarkWidgetData.url;
    }
  }

  return (
    <div className="bookmark-widget">
      <input
        type="text"
        value={bookmarkWidgetData.url}
        onChange={handleUrlChange}
        onKeyPress={handleKeyPress}
      />
      {bookmarkWidgetData.url && (
        <img 
          src={bookmarkWidgetData.icon} 
          alt="Bookmark Icon" 
          onClick={handleIconClick}
          style={{ cursor: 'pointer' }} 
        />
      )}
      <button onClick={onDeleteButtonClick}>삭제</button>
    </div>
  );
};

export default BookmarkWidget;
