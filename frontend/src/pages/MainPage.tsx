import axios, { AxiosError } from "axios";
import { BackgroundImage, useBackgroundImage, useWidgets } from "../recoil/WidgetList";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TextWidget from "../widgets/TextWidget";
import BookmarkWidget from "../widgets/BookmarkWidget";
import SearchWidget from "../widgets/SearchWidget";
import ClockWidget from "../widgets/ClockWidget";
import ImageWidget from "../widgets/ImageWidget";
import './MainPage.css';
import './Edit_Main.css';

function MainPage() {
  const { prevWidgets, setPrevWidgets, widgets, setWidgets } = useWidgets();
  const { backgroundImage, setBackgroundImage} = useBackgroundImage();
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
        { headers: { 'authorization': `Bearer ${userToken}` } }
      );
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
          case "ImageWidget":
            fetchedElement = (
              <ImageWidget
                widgetId={temp._id}
                widgetType="ImageWidget"
                widgetTopLeftX={temp.properties.widgetTopLeftX}
                widgetTopLeftY={temp.properties.widgetTopLeftY}
                width={temp.properties.width}
                height={temp.properties.height}
                url={temp.properties.url}
              />
            );
            fetchedWidgets.push(fetchedElement);
            break;
          default:
            break;
        }
      }
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
  }, [widgets]);

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


  const [backgroundImage, setBackgroundImage] = useState<string | null>(null);

  function moveToSetting(){
    navigate('/setting')
  }



  useEffect(() => {
    const fetchBackgroundImage = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/image`, {
          headers: {
            'authorization': `Bearer ${userToken}`,
          }
        });
        console.log(response.data);
        if (response.data && response.data.imageUrl) {
          setBackgroundImage(response.data.imageUrl);
        }
      } catch (error) {
        console.error('Error fetching the background image: ', error);
      }
    };

    fetchBackgroundImage();
  }, []);


  return (
    <div className="Whiteboard" style={{ backgroundImage: `url(${backgroundImage})` }} >
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

      
      <button className="Right_Top_Component" onClick={moveToSetting}>
        {!rightImgError ? (
          <img className="Button_img" src={process.env.PUBLIC_URL + "/setting.png"} alt="settings" onError={handleRightImgError} />
        ) : (
          <p>setting</p>
        )}
      </button>
      <button className="Left_Top_Component" onClick={handleToEdit}>
        {!leftImgError ? (
          <img className="Button_img" src={process.env.PUBLIC_URL + "/edit.png"} alt="dit" onError={handleLeftImgError} />
        ) : (
          <p>edit</p>
        )}
      </button>
    </div>
  );
}

export default MainPage;