import axios, { AxiosError } from "axios";
import { useWidgets } from "../recoil/WidgetList";
import "./EditPage.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function MainPage() {
  const {prevWidgets, setPrevWidgets} = useWidgets()
  const [imgError, setImgError] = useState<boolean>(false)
  const [profileToggle, setProfileToggle] = useState<boolean>(false)
  const navigate = useNavigate();
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
          <div style={{position:'absolute'}}>
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

