import axios, { AxiosError } from "axios";
import { useWidgets } from "../recoil/WidgetList";
import "./EditPage.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TextWidget from "../widgets/customWidgets/TextWidget";

function MainPage() {
  const {prevWidgets, setPrevWidgets, widgets, addWidget} = useWidgets()
  const [imgError, setImgError] = useState<boolean>(false)
  const [profileToggle, setProfileToggle] = useState<boolean>(false)
  const navigate = useNavigate();
  async function fetchWidgets(){
    try {
      const userToken = localStorage.getItem("userToken");
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/widget`, {headers: {authorization: `Bearer ${userToken}`}});
      response.data.map((temp: { properties: { widgetType: any; widgetTopLeftX: number; widgetTopLeftY: number; width: number; height: number; text: string; }; _id: string; }) => {
        switch(temp.properties.widgetType){
          case "TextWidget":
            const fetchedElement = (<TextWidget
                                      widgetId={temp._id} 
                                      widgetTopLeftX={temp.properties.widgetTopLeftX} 
                                      widgetTopLeftY={temp.properties.widgetTopLeftY} 
                                      width={temp.properties.width} 
                                      height={temp.properties.height} 
                                      text={temp.properties.text}/>)
            addWidget(fetchedElement)
            break;
          default:
            break;
      }})
      setPrevWidgets(widgets)
      console.log(prevWidgets)
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

  function handleProfile(){
    

  }
  function handleToEdit(){
    navigate('/edit')
  }
  function handleImgError(event: React.SyntheticEvent<HTMLImageElement, Event>){
    setImgError(true)
  }

  return (
    <div>
      {prevWidgets.map((widget) => (
        <div
          key={widget.props.widgetId}>
          <div style={{position:'absolute',
                        top: widget.props.widgetTopLeftY,
                        left: widget.props.widgetTopLeftX}}>
            {widget}
          </div>
        </div>))}
      <button className="Right_button" onClick={handleProfile}>
      </button>
      <button className="Left_Top_Component" onClick={handleToEdit}>
        {!imgError? 
         (<img src="" alt="EDIT" onError={handleImgError}/>)
        : (<p>EDIT</p>)}
      </button>
    </div>
    
  )
}

export default MainPage;

