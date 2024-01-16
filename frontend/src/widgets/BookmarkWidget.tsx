import React, { useEffect, useRef } from "react";
import { useWidgets } from "../recoil/WidgetList";
import { BookmarkWidgetData } from "../types/Type";

const BookmarkWidget = (bookmarkWidgetData: BookmarkWidgetData) => {
  const { setCurrentUrl, updateBookmark, updateSize } = useWidgets();
  const bookmarkRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    const handleResize = () => {
      if (bookmarkRef) {
        const rect = bookmarkRef.current?.getBoundingClientRect();
        updateSize(bookmarkWidgetData.widgetId, rect!!.width, rect!!.height);
      }
    };
    handleResize();
  }, []);

  return (
    <div className="bookmark-widget" ref={bookmarkRef}>
      {!bookmarkWidgetData.icon && (
        <input
          type="text"
          value={bookmarkWidgetData.url}
          onChange={handleUrlChange}
          style={{
            width: bookmarkWidgetData.width,
            height: bookmarkWidgetData.height,
          }}
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
          style={{
            cursor: "pointer",
            width: bookmarkWidgetData.width,
            height: bookmarkWidgetData.height,
          }}
        />
      )}
    </div>
  );
};

export default BookmarkWidget;
