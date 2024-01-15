import axios, { AxiosError } from "axios";
import { useWidgets } from "../recoil/WidgetList";
import "./EditPage.css";
import TextWidget from "../widgets/customWidgets/TextWidget";
import { JSX } from "react/jsx-runtime";
import { useEffect } from "react";

function MainPage() {
  const {prevWidgets, setPrevWidgets} = useWidgets()

  async function fetchWidgets(){
    try {
      const userToken = localStorage.getItem("userToken");
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/widget`, {headers: {authorization: `Bearer ${userToken}`}});
      setPrevWidgets(response.data)
      console.log(response.data)
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
  useEffect(()=>{
    fetchWidgets()
  }, [])

  return (
    <div>
      {prevWidgets.map((widget) => (
        <div
          key={widget.props.widgetId}>
          <div style={{position:'absolute'}}>
            {widget}
          </div>
        </div>))}
    </div>
  )
}

export default MainPage;

