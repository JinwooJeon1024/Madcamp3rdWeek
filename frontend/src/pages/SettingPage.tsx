import { useNavigate } from 'react-router-dom';
import './SettingPage.css'
import { useEffect, useState } from 'react';
import axios, { AxiosError } from 'axios';

function SettingPage(){
    const navigate = useNavigate();
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
            const request = {
                
            };
            const response = await axios.post(
            `${process.env.REACT_APP_API_URL}/widget/create`,
                request,
                { headers: { authorization: `Bearer ${userToken}` } }
            );
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

    const [backgroundImage, setBackgroundImage] = useState<string | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files && event.target.files[0];
        if (file) {
          const reader = new FileReader();
    
          reader.onloadend = () => {
            // reader.result가 string인 경우에만 setBackgroundImage에 할당
            if (typeof reader.result === 'string') {
              setBackgroundImage(reader.result);
              localStorage.setItem('backgroundImage', reader.result);
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