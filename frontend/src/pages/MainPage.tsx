import axios, { AxiosError } from "axios";
import { useWidgets } from "../recoil/WidgetList";
import "./EditPage.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TextWidget from "../widgets/customWidgets/TextWidget";
import BookmarkWidget from "../widgets/customWidgets/BookmarkWidget";
import React from "react";

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

        response.data.forEach((temp: { properties: { widgetType: string; widgetTopLeftX: number; widgetTopLeftY: number; width: number; height: number; text: string; url: string; icon: string; }; _id: string; }) => 
        { let fetchedElement;
          switch(temp.properties.widgetType){
            case "TextWidget":
              // fetchedElement = React.createElement(TextWidget, {
              //   widgetId:temp._id,
              //   widgetType:"TextWidget",
              //   widgetTopLeftX:temp.properties.widgetTopLeftX,
              //   widgetTopLeftY:temp.properties.widgetTopLeftY ,
              //   width:temp.properties.width,
              //   height:temp.properties.height, 
              //   text:temp.properties.text,})
              fetchedElement = temp
              console.log(fetchedElement)
              // addWidget(fetchedElement)
              console.log("fetched widgets", widgets)
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
              console.log("fetched widgets",widgets)
              break;
            default:
              console.log("default")
              break;
        }})
        console.log("result widgets",widgets)
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