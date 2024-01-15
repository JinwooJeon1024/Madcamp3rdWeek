import useWidgetList from "../widgets/widgetHooks/UseWidgetList";
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
