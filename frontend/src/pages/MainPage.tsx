import axios, { AxiosError } from "axios";
import { useWidgets } from "../recoil/WidgetList";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TextWidget from "../widgets/customWidgets/TextWidget";
import BookmarkWidget from "../widgets/customWidgets/BookmarkWidget";
import SearchWidget from "../widgets/customWidgets/SearchWidget";
import ClockWidget from "../widgets/customWidgets/ClockWidget";
import './Edit_Main.css'

function MainPage() {
  const { prevWidgets, setPrevWidgets, widgets, setWidgets } = useWidgets();
  const [rightImgError, setRightImgError] = useState<boolean>(false);
  const [leftImgError, setLeftImgError] = useState<boolean>(false);
  const navigate = useNavigate();
  const userToken = localStorage.getItem("userToken");
  let fetchedElement;

  async function clearWidgets() {
    setWidgets([]);
  }

  async function fetchWidgets() {
    let fetchedWidgets = [];
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/widget`,
        { headers: { authorization: `Bearer ${userToken}` } }
      );
      console.log("get Response", response.data);
      for (const temp of response.data) {
        switch (temp.properties.widgetType) {
          case "TextWidget":
            fetchedElement = (
              <TextWidget
                widgetId={temp._id}
                widgetType="TextWidget"
                widgetTopLeftX={temp.properties.widgetTopLeftX}
                widgetTopLeftY={temp.properties.widgetTopLeftY}
                width={temp.properties.width}
                height={temp.properties.height}
                text={temp.properties.text}
              />
            );
            console.log("get Text", fetchedWidgets);
            fetchedWidgets.push(fetchedElement);
            break;
          case "BookmarkWidget":
            fetchedElement = (
              <BookmarkWidget
                widgetId={temp._id}
                widgetType="BookmarkWidget"
                widgetTopLeftX={temp.properties.widgetTopLeftX}
                widgetTopLeftY={temp.properties.widgetTopLeftY}
                width={temp.properties.width}
                height={temp.properties.height}
                url={temp.properties.url}
                icon={temp.properties.icon}
              />
            );
            console.log("get Book", fetchedWidgets);
            fetchedWidgets.push(fetchedElement);
            break;
          case "SearchWidget":
            fetchedElement = (
              <SearchWidget
                widgetId={temp._id}
                widgetType="SearchWidget"
                widgetTopLeftX={temp.properties.widgetTopLeftX}
                widgetTopLeftY={temp.properties.widgetTopLeftY}
                width={temp.properties.width}
                height={temp.properties.height}
                search={temp.properties.search}
              />
            );
            fetchedWidgets.push(fetchedElement);
            break;
            case "ClockWidget":
              fetchedElement = (
                <ClockWidget
                  widgetId={temp._id}
                  widgetType="ClockWidget"
                  widgetTopLeftX={temp.properties.widgetTopLeftX}
                  widgetTopLeftY={temp.properties.widgetTopLeftY}
                  width={temp.properties.width}
                  height={temp.properties.height}
                  time={temp.properties.time}
                />
              );
              fetchedWidgets.push(fetchedElement);
              break;
          default:
            break;
        }
      }
      console.log(fetchedWidgets);
      setWidgets(fetchedWidgets);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        if (axiosError.response) {
          console.error("Error submitting form : ", error.response?.data);
        } else {
          console.error("Unexpected error : ", error);
        }
      } else {
        console.error("Non-Axios error : ", error);
      }
    }
  }

  useEffect(() => {
    clearWidgets().then(() => {
      fetchWidgets()    
    });
  }, []);

  useEffect(() => {
    setPrevWidgets(widgets);
    console.log("Widgets updated", widgets);
  }, [widgets]);

  function handleLogout() {
    localStorage.removeItem("userToken");
    navigate("/");
  }
  function handleToEdit() {
    navigate("/edit");
  }
  function handleLeftImgError(
    event: React.SyntheticEvent<HTMLImageElement, Event>
  ) {
    setLeftImgError(true);
  }
  function handleRightImgError(
    event: React.SyntheticEvent<HTMLImageElement, Event>
  ) {
    setRightImgError(true);
  }

  return (
    <div className="Whiteboard">
      {prevWidgets.map((widget) => (
        <div key={widget.props._id}>
          <div
            style={{
              position: "absolute",
              top: widget.props.widgetTopLeftY,
              left: widget.props.widgetTopLeftX,
            }}
          >
            {widget}
          </div>
        </div>
      ))}
      <button className="Right_Top_Component" onClick={handleLogout}>
        {!rightImgError ? (
          <img src={process.env.PUBLIC_URL + "/logout.png"} alt="LOGOUT" onError={handleRightImgError} />
        ) : (
          <p>LOGOUT</p>
        )}
      </button>
      <button className="Left_Top_Component" onClick={handleToEdit}>
        {!leftImgError ? (
          <img src={process.env.PUBLIC_URL + "/edit.png"} alt="EDIT" onError={handleLeftImgError} />
        ) : (
          <p>EDIT</p>
        )}
      </button>
    </div>
  );
}

export default MainPage;
