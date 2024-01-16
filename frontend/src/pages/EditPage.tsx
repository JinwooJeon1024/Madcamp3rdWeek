import React, { ReactElement, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { WidgetType } from "../types/Type";
import './Edit_Main.css';
import { useWidgets } from "../recoil/WidgetList";
import WIDGET_MENU from "../widgets/WidgetMenu";
import Draggable, { DraggableData } from "react-draggable";
import axios, { AxiosError } from "axios";
import TextWidget from "../widgets/TextWidget";
import registerMouseDownDrag from "../services/registerMouseDownDrag";
import BookmarkWidget from "../widgets/BookmarkWidget";
import ClockWidget from "../widgets/ClockWidget";
import SearchWidget from "../widgets/SearchWidget";
import ImageWidget from "../widgets/ImageWidget";


const EditPage = () => {
  const {
    widgets,
    prevWidgets,
    addWidget,
    updatePosition,
    updateSize,
    removeWidget,
    setWidgets
  } = useWidgets();

  const [rightImgError, setRightImgError] = useState<boolean>(false);
  const [leftImgError, setLeftImgError] = useState<boolean>(false);
  const [deleteImgError, setDeleteImgError] = useState<boolean>(false);
  const [menuDrag, setMenuDrag] = useState<boolean>(false);
  const navigate = useNavigate();

  async function sendWidgets(sendRequest: ReactElement[]) {
    try {
      const userToken = localStorage.getItem("userToken");
      const widgetsData = sendRequest.map((widget) => widget.props);
      const formattedWidgets = widgetsData.map((widgetData) => ({
        properties: widgetData,
      }));
      const request = {
        widgets: formattedWidgets,
      };
      await axios.put(
        `${process.env.REACT_APP_API_URL}/widget/update`,
        request,
        { headers: { authorization: `Bearer ${userToken}` } }
      );
      navigate("/main");
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

  function handleSave() {
    sendWidgets(widgets);
  }
  function handleDiscard() {
    sendWidgets(prevWidgets);
  }
  function handleOnDragStart(event: React.DragEvent, widgetType: WidgetType) {
    event.stopPropagation();
    event.dataTransfer.setData("widgetType", widgetType);
  }
  function handleOnDragOver(event: React.DragEvent) {
    event.preventDefault();
  }
  function handlePosition(data: DraggableData, widgetId: string) {
    updatePosition(widgetId, data);
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
  function handleDeleteImgError(
    event: React.SyntheticEvent<HTMLImageElement, Event>
  ) {
    setDeleteImgError(true);
  }
  function onDeleteButtonClick(widgetId: string) {
    removeWidget(widgetId);
  }
  function handleMenuDragStart() {
    setMenuDrag(true)
  }
  function handleMenuDragStop() {
    setMenuDrag(false)
  }
  async function handleOnNewWidgetDrop(event: React.DragEvent) {
    const widgetType = event.dataTransfer.getData("widgetType") as WidgetType;
    const mouseX = event.clientX;
    const mouseY = event.clientY;
    try {
      const userToken = localStorage.getItem("userToken");

      const request = {
        properties: { type: widgetType, x: 0, y: 0, width: 0, height: 0 },
      };
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/widget/create`,
        request,
        { headers: { authorization: `Bearer ${userToken}` } }
      );
      switch (widgetType) {
        case "TextWidget":
          const newTextWidget = (
            <TextWidget
              widgetType="TextWidget"
              widgetId={response.data.data._id}
              widgetTopLeftX={mouseX}
              widgetTopLeftY={mouseY}
              width={0}
              height={0}
              text={""}
            />
          );
          addWidget(newTextWidget);
          break;
        case "BookmarkWidget":
          const newBookmarkWidget = (
            <BookmarkWidget
              widgetType="BookmarkWidget"
              widgetId={response.data.data._id}
              widgetTopLeftX={mouseX}
              widgetTopLeftY={mouseY}
              width={0}
              height={0}
              url=""
              icon=""
            />
          );
          addWidget(newBookmarkWidget);
          break;
        case "ClockWidget":
          const newClockWidget = (
            <ClockWidget
              widgetId={response.data.data._id}
              widgetType="ClockWidget"
              widgetTopLeftX={mouseX}
              widgetTopLeftY={mouseY}
              width={100}
              height={100}
              time=""
            />
          );
          addWidget(newClockWidget);
          break;
        case "SearchWidget":
          const newSearchWidget = (
            <SearchWidget
              widgetType="SearchWidget"
              widgetId={response.data.data._id}
              widgetTopLeftX={mouseX}
              widgetTopLeftY={mouseY}
              width={400}
              height={50}
              search=""
            />
          );
          addWidget(newSearchWidget);
          break;
        case "ImageWidget":
          const newImageWidget = (
            <ImageWidget
              widgetType="ImageWidget"
              widgetId={response.data.data._id}
              widgetTopLeftX={mouseX}
              widgetTopLeftY={mouseY}
              width={300}
              height={300}
              url=""
            />
          );
          addWidget(newImageWidget);
          break;
        default:
          break;
      }
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

  return (
    <div className="Container">
      <div
        className="Whiteboard"
        onDrop={handleOnNewWidgetDrop}
        onDragOver={handleOnDragOver}
      >
        {widgets.map((widget) => (
          <Draggable
            key={widget.props.widgetId}
            onStop={(event, data) =>
              handlePosition(data, widget.props.widgetId)
            }
            defaultPosition={{
              x: widget.props.widgetTopLeftX,
              y: widget.props.widgetTopLeftY,
            }}
            bounds="parent"
            cancel=".Resize_box"
          >
            <div style={{ position: "absolute" }}>
              {widget}
              <div
                className="Resize_box"
                {...registerMouseDownDrag((deltaX, deltaY) => {
                  updateSize(
                    widget.props.widgetId,
                    deltaX + widget.props.width,
                    deltaY + widget.props.height
                  );
                })}
              >
                <img className="Resize_img" src={process.env.PUBLIC_URL + "/resize.png"} alt =" "/>
              </div>
              <button
                type="button"
                className="Delete_box"
                onClick={() => onDeleteButtonClick(widget.props.widgetId)}>
                {!deleteImgError ? 
                (<img className="Delete_img" src={process.env.PUBLIC_URL + "/delete.png"} alt="X" onError={handleDeleteImgError} />) : 
                (<p>X</p>)}
              </button>
            </div>
          </Draggable>
        ))}
      </div>
      <Draggable
        cancel=".Widget_pick"
        bounds="parent"
        onStart={handleMenuDragStart}
        onStop={handleMenuDragStop}>
        <div className="Menu" style={{ boxShadow: menuDrag ? '0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)' : 'none' }}>
          {WIDGET_MENU.map(({ type, image }) => (
            <img
              className="Widget_pick"
              src={image}
              alt={type}
              draggable
              onDragStart={(event) => handleOnDragStart(event, type)}
            />
          ))}
        </div>
      </Draggable>
      <button className="Right_Top_Component" onClick={handleSave}>
        {!rightImgError ? (
          <img className="Button_img" src={process.env.PUBLIC_URL + "/save.png"} alt="save" onError={handleRightImgError} />
        ) : (
          <p>save</p>
        )}
      </button>
      <button className="Left_Top_Component" onClick={handleDiscard}>
        {!leftImgError ? (
          <img className="Button_img" src={process.env.PUBLIC_URL + "/discard.png"} alt="discard" onError={handleLeftImgError} />
        ) : (
          <p>discard</p>
        )}
      </button>
    </div>
  );
};

export default EditPage;
