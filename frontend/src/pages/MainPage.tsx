import axios, { AxiosError } from "axios";
import { useWidgets } from "../recoil/WidgetList";
import "./EditPage.css";
import TextWidget from "../widgets/customWidgets/TextWidget";
import { JSX } from "react/jsx-runtime";
import { useEffect } from "react";
import { WidgetData } from "../types/Type";

function MainPage() {
   const { prevWidgets, setPrevWidgets } = useWidgets();
   const { widgets, setWidgets } = useWidgets();

  async function fetchWidgets() {
    try {
      const userToken = localStorage.getItem("userToken");
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/widget`,
        { headers: { authorization: `Bearer ${userToken}` } }
      );
      setPrevWidgets(response.data);
      setWidgets(response.data);
      console.log(response.data);
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
    fetchWidgets();
  }, []);

  function renderWidget(widget : WidgetData) {
    switch (widget.widgetType) {
      case "TextWidget":
        return (
          <TextWidget
            widgetId={widget.widgetId}
            widgetType={widget.widgetType}
            widgetTopLeftX={widget.widgetTopLeftX}
            widgetTopLeftY={widget.widgetTopLeftY}
            width={widget.width}
            height={widget.height}
            text={widget.text}
          />
        );
      default:
        return null;
    }
  }

  return <div>{prevWidgets.map((widget) => renderWidget(widget))}</div>;
}

export default MainPage;
