import { useWidgetList } from "../widgets/WidgetHooks";
import "./EditPage.css";

function MainPage() {
  const { widgets, addWidget, deleteWidget } = useWidgetList();

  return (
    <div>
      {widgets.map((widget, index) => (
        <div key={index}>{widget}</div>
      ))}
    </div>
  );
}

export default MainPage;
