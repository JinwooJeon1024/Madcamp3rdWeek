import { MainPageProps } from "../types/Type";
import "./EditPage.css";

function MainPage(props: MainPageProps) {
  const { widgets, onDragDrop } = props;

  return (
    <div className="Whiteboard" onDrop={onDragDrop}>
      {widgets.map((widget, index) => (
        <div key={index}>{widget}</div>
      ))}
    </div>
  );
}

export default MainPage;
