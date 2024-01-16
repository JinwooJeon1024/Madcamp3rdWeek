import axios, { AxiosError } from "axios";
import { useWidgets } from "../recoil/WidgetList";
import "./EditPage.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TextWidget from "../widgets/customWidgets/TextWidget";
import BookmarkWidget from "../widgets/customWidgets/BookmarkWidget";
import SearchWidget from "../widgets/customWidgets/SearchWidget";


function MainPage() {
  const {prevWidgets, setPrevWidgets, widgets, addWidget} = useWidgets()
  const [rightImgError, setRightImgError] = useState<boolean>(false)
  const [leftImgError, setLeftImgError] = useState<boolean>(false)
  const navigate = useNavigate();
  
  useEffect(()=>{
    async function fetchWidgets(){
      try {
        const userToken = localStorage.getItem("userToken");
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/widget`, {headers: {authorization: `Bearer ${userToken}`}});
        console.log("response data", response.data)


  async function fetchWidgets(){
    try {
      console.log("fetch")
      const userToken = localStorage.getItem("userToken");
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/widget`, {headers: {authorization: `Bearer ${userToken}`}});
      console.log(response.data)
      response.data.map((temp: { properties: { widgetType: any; widgetTopLeftX: number; widgetTopLeftY: number; width: number; height: number; text: string; url: string; icon: string; }, _id: string; }) => 
      {switch(temp.properties.widgetType){
          case "TextWidget":
            fetchedElement = (<TextWidget
                                widgetId={temp._id}
                                widgetType="BookmarkWidget"
                                widgetTopLeftX={temp.properties.widgetTopLeftX} 
                                widgetTopLeftY={temp.properties.widgetTopLeftY} 
                                width={temp.properties.width} 
                                height={temp.properties.height} 
                                text={temp.properties.text}/>)
            console.log(fetchedElement)
            addWidget(fetchedElement)
            console.log(widgets)
            break;
          case "BookmarkWidget":
            fetchedElement = (<BookmarkWidget
                              widgetId={temp._id}
                              widgetType="BookmarkWidget"
                              widgetTopLeftX={temp.properties.widgetTopLeftX} 
                              widgetTopLeftY={temp.properties.widgetTopLeftY} 
                              width={temp.properties.width} 
                              height={temp.properties.height} 
                              url={temp.properties.url}
                              icon={temp.properties.icon}/>)
            addWidget(fetchedElement)
            console.log(fetchedElement)
            console.log(widgets)
            break;
          case "SearchWidget":
            fetchedElement = (<SearchWidget
                              widgetId={temp._id}
                              widgetType="SearchWidget"
                              widgetTopLeftX={temp.properties.widgetTopLeftX} 
                              widgetTopLeftY={temp.properties.widgetTopLeftY} 
                              width={temp.properties.width} 
                              height={temp.properties.height} 
                              search={temp.properties.icon}/>)
            addWidget(fetchedElement)
            console.log(fetchedElement)
            console.log(widgets)
            break;
          default:
            console.log("default")
            break;
      }})
      
      console.log("widgets", widgets)
      console.log("prevWidgets", prevWidgets)
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        if (axiosError.response) {
          console.error("Error submitting form : ", error.response?.data);
        } else {
          console.error("Non-Axios error : ", error);
        }
      }
    }
    
    fetchWidgets()
  },[])


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