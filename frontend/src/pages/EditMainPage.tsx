import { EditMainPageProps } from "../types/Type";
import "./EditPage.css";

function EditMainPage(props: EditMainPageProps) {
  const { widgets, onDragDrop} = props;
  function handleOnDragOver(event: React.DragEvent){
    event.preventDefault();
    console.log("over called on editmainpage");
  }
  return (
    <div className="Whiteboard"
      onDrop={onDragDrop}
      onDragOver={handleOnDragOver}>
      {widgets.map((widget, index) => (
        <div key={index}>{widget}</div>
      ))}
    </div>
  );
}

export default EditMainPage;
