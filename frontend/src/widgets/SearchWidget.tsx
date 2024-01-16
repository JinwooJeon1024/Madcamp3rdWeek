import React, { useEffect, useRef, useState } from "react";
import { useWidgets } from "../recoil/WidgetList";
import { SearchWidgetData } from "../types/Type";

const SearchWidget = (searchWidgetData: SearchWidgetData) => {
  const { setCurrentSearch, updateSize } = useWidgets();
  const searchRef = useRef<HTMLDivElement>(null);
  const [searchTerm, setSearchTerm] = useState('');

  function handleSearchChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchTerm(event.target.value);
    setCurrentSearch(searchWidgetData.widgetId, event.target.value);
  }

  useEffect(() => {
    const handleResize = () => {
      if (searchRef.current) {
        const rect = searchRef.current.getBoundingClientRect();
        updateSize(searchWidgetData.widgetId, rect.width, rect.height);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [updateSize, searchWidgetData.widgetId]);

  return (
    <div className="search-widget" ref={searchRef}>
      <form action="https://www.google.com/search" method="get" target="_blank">
        <input
          type="text"
          name="q"
          value={searchTerm}
          onChange={handleSearchChange}
          style={{ width: searchWidgetData.width, height: searchWidgetData.height }}
        />
        <button type="submit">검색</button>
      </form>
    </div>
  );
};

export default SearchWidget;