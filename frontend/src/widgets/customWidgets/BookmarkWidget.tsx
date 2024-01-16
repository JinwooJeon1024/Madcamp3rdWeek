import React from 'react';
import { useWidgets } from "../../recoil/WidgetList";
import { BookmarkWidgetData } from "../../types/Type";

const BookmarkWidget = (bookmarkWidgetData : BookmarkWidgetData) => {
  const { updateBookmark, removeWidget, updateSize } = useWidgets();

  function onDeleteButtonClick() {
    console.log(`Bookmark delete clicked, delete ${bookmarkWidgetData.widgetId}`);
    removeWidget(bookmarkWidgetData.widgetId);
  }

  function handleUrlChange(event: React.ChangeEvent<HTMLInputElement>) {
    const newUrl = event.target.value;
    console.log(newUrl);
    console.log(`${bookmarkWidgetData.widgetId}`);

    // 업데이트할 때 아이콘도 새 URL에 맞춰 업데이트
    const newIcon = newUrl ? `${new URL(newUrl).origin}/favicon.ico` : '';
    updateBookmark(bookmarkWidgetData.widgetId, newUrl, newIcon);
  }

  function handleIconClick() {
    if (bookmarkWidgetData.url) {
      window.location.href = bookmarkWidgetData.url; // URL로 이동
    }
  }

  return (
    <div className="bookmark-widget">
      <input
        type="text"
        value={bookmarkWidgetData.url}
        onChange={handleUrlChange}
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
