import { useNavigate } from 'react-router-dom';
import './SettingPage.css'
import { useEffect, useState } from 'react';
import axios, { AxiosError } from 'axios';
import { useBackgroundImage } from '../recoil/WidgetList';

function SettingPage(){
    const navigate = useNavigate();
    const { backgroundImage, setBackgroundImage} = useBackgroundImage();
    const [userInfo, setUserInfo] = useState<{name : string, email: string}>({name: "", email: ""});
    function returnToMain(){
        navigate('/main')
    }
    useEffect(()=>{
        async function getUserData(){
            try {
                const userToken = localStorage.getItem("userToken");
                const response = await axios.get(
                    `${process.env.REACT_APP_API_URL}/users/info`,
                    { headers: { authorization: `Bearer ${userToken}` } }
                  );
                console.log(response.data)
                setUserInfo({name : response.data.name,email : response.data.email})
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
        getUserData()
    }, [])
    async function deleteAccount(){
        try{
            const userToken = localStorage.getItem("userToken");
            const response = await axios.delete(
            `${process.env.REACT_APP_API_URL}/users/delete`,
                { headers: { authorization: `Bearer ${userToken}` } }
            );
            console.log(response.data)
            userLogout()
        } catch{
            
        }
    }
    function userLogout(){
        localStorage.removeItem("userToken");
        navigate("/");
    }
    function handleBackground(){
        document.getElementById('fileInput')?.click();
    }


    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files && event.target.files[0];
      if (file) {
        const reader = new FileReader();
        const userToken = localStorage.getItem("userToken");
        reader.onloadend = async () => {
          if (typeof reader.result === 'string') {
            setBackgroundImage(reader.result);
            console.log(reader.result)
            try {
              await axios.put(
                `${process.env.REACT_APP_API_URL}/image/update`, { url: reader.result }, {
                headers: {
                  'authorization': `Bearer ${userToken}`,
                }              
              });
              console.log("request", reader.result)
            } catch (error) {
              console.error('Error uploading the image: ', error);
            }
          }
        };
        reader.readAsDataURL(file);
      }
    };
    
    return (
        <div className="Container">
            <div className="Left">
                <img className="Setting_logo" src={process.env.PUBLIC_URL + "/name.png"} alt="canvas"/>
                <img className="My" src={process.env.PUBLIC_URL + "/my.png"} alt="my"/>
            </div>
            <div className="Right"> 
                <div className="Profile">
                    <span className="Title">profile</span>
                    <div className="Profile_container">
                        <span className="Profile_Description">name</span>
                        <span className="Profile_Data">{`${userInfo.name}`}</span>
                    </div>
                    <div className="Profile_container">
                        <span className="Profile_Description">email</span>
                        <span className="Profile_Data">{`${userInfo.email}`}</span>
                    </div>                    
                </div>
                <div className="Background_img">
                    <span className="Title">background</span>
                    <button className="Background_button" onClick={handleBackground}>choose image</button>
                    <input
                        type="file"
                        id="fileInput"
                        style={{ display: 'none' }}
                        onChange={handleFileChange}
                        accept="image/*"
                    />
                </div>
                <div className="Account">
                    <span className="Title">account</span>
                    <button className="Logout" onClick={userLogout}>logout</button>
                    <button className="Delete_account" onClick={deleteAccount}>delete my account</button>
                </div>
                <button className="Right_Top_Component" onClick={returnToMain}>
                    <img className="Button_img" src={process.env.PUBLIC_URL + "/main.png"} alt="main" />
                </button>
            </div>
            
        </div>
    )
}

export default SettingPage;