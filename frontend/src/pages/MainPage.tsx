import { useWidgetList } from "../widgets/Widget";
import "./EditPage.css";

function MainPage() {
  const { widgets, addWidget, deleteWidget } = useWidgetList();
  const userToken = localStorage.getItem("userToken");

  return (
    <div>
      {widgets.map((widget, index) => (
        <div key={index}>{widget}</div>
      ))}
    </div>
  );
}

export default MainPage;
