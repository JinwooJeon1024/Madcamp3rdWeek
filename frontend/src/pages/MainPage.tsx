import axios, { AxiosError } from "axios";
import { useWidgets } from "../recoil/WidgetList";
import "./EditPage.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TextWidget from "../widgets/customWidgets/TextWidget";

function MainPage() {
  const {prevWidgets, setPrevWidgets, widgets, addWidget} = useWidgets()
  const [rightImgError, setRightImgError] = useState<boolean>(false)
  const [leftImgError, setLeftImgError] = useState<boolean>(false)
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

  function handleLogout(){
    localStorage.removeItem("userToken")
    navigate('/')
  }
  function handleToEdit(){
    navigate('/edit')
  }
  function handleLeftImgError(event: React.SyntheticEvent<HTMLImageElement, Event>){
    setLeftImgError(true)
  }
  function handleRightImgError(event: React.SyntheticEvent<HTMLImageElement, Event>){
    setRightImgError(true)
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
      <button className="Right_Top_Component" onClick={handleLogout}>
      {!rightImgError? 
         (<img src="" alt="LOGOUT" onError={handleRightImgError}/>)
        : (<p>LOGOUT</p>)}
      </button>
      <button className="Left_Top_Component" onClick={handleToEdit}>
        {!leftImgError? 
         (<img src="" alt="EDIT" onError={handleLeftImgError}/>)
        : (<p>EDIT</p>)}
      </button>
    </div>
    
  )
}

export default MainPage;

