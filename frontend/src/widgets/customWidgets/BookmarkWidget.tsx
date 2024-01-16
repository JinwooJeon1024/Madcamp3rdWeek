import React from "react";
import { useWidgets } from "../../recoil/WidgetList";
import { BookmarkWidgetData } from "../../types/Type";

const BookmarkWidget = (bookmarkWidgetData: BookmarkWidgetData) => {
  const { setCurrentUrl, updateBookmark, removeWidget } = useWidgets();

  function onDeleteButtonClick() {
    console.log(
      `Bookmark delete clicked, delete ${bookmarkWidgetData.widgetId}`
    );
    removeWidget(bookmarkWidgetData.widgetId);
  }

  function handleUrlChange(event: React.ChangeEvent<HTMLInputElement>) {
    setCurrentUrl(bookmarkWidgetData.widgetId, event.target.value);
  }

  function handleIconClick() {
    if (bookmarkWidgetData.url) {
      window.location.href = bookmarkWidgetData.url;
    }
  }

  function handleKeyPress(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      try {
        new URL(bookmarkWidgetData.url);
        updateBookmark(bookmarkWidgetData.widgetId, bookmarkWidgetData.url);
      } catch (error) {
        console.error("Invalid URL:", error);
      }
    }
  }

  return (
    <div className="bookmark-widget">
      {!bookmarkWidgetData.icon && (
        <input
          type="text"
          value={bookmarkWidgetData.url}
          onChange={handleUrlChange}
          onKeyPress={handleKeyPress}
        />
      )}
      {bookmarkWidgetData.icon && (
        <img
          src={
            bookmarkWidgetData.url
              ? `${new URL(bookmarkWidgetData.url).origin}/favicon.ico`
              : ""
          }
          alt="Bookmark Icon"
          onClick={handleIconClick}
          style={{ cursor: "pointer" }}
        />
      )}
      <button onClick={onDeleteButtonClick}>삭제</button>
    </div>
  );
};

export default BookmarkWidget;
