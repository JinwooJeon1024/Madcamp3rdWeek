import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginSignUp.css';
import axios, {AxiosError} from 'axios';



const LoginPage: React.FC = () => {
    const navigate = useNavigate();
    console.log("loginpage");


    const [userData, setUserData] = useState({
        email:'',
        password:''
    });
    const [currentStep, setCurrentStep] = useState<'email' | 'password'>('email');


    const handleKeyDown = (e : React.KeyboardEvent<HTMLInputElement>) => {
        if(e.key === 'Enter'){
            switch(currentStep){
                case 'email':
                    handleToPassword();
                    break;
                default:
                    break;
            }
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setUserData((prevData) => ({...prevData, [name]: value}));
    };

    const handleToPassword = ()=>{
        setCurrentStep('password');
    };
    const handleToEmail = ()=>{
        setCurrentStep('email');
    };
    const handleToHome =() =>{
        navigate('/');
    };


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try{
            const response = await axios.post('http://143.248.196.62:5000/api/users/login', userData);
            console.log(response.data);
            navigate('/');
        } catch(error){
            if(axios.isAxiosError(error)){
                const axiosError = error as AxiosError;
                if(axiosError.response){
                    console.error("Error submitting form : ", error.response?.data);
                }
                else{
                    console.error("Unexpected error : ", error);
                }
                
            } else {
                console.error("Non-Axios error : ", error);
            }
        }
    };
    return (
        <form onSubmit={handleSubmit}>
            {currentStep === 'email' && (
                <div className="Input_container">
                    <h1 className="Question">Enter Your Email</h1>
                    <input 
                        className="Input" 
                        type="email"
                        name="email"
                        value={userData.email}
                        onChange={handleInputChange}
                        onKeyDown={handleKeyDown}/>
                    <div className="Button_container">
                        <button className="Twoside_button" onClick={handleToHome}>홈으로 돌아가기</button>
                        <button className="Twoside_button" onClick={handleToPassword}>다음으로 이동</button>
                    </div>
                </div>    
            )}
            {currentStep === 'password' && (
                <div className="Input_container">
                    <h1 className="Question">Enter Your Password</h1>
                    <input 
                        className="Input" 
                        type="password"
                        name="password"
                        value={userData.password}
                        onChange={handleInputChange}
                        onKeyDown={handleKeyDown}/>
                    <div className="Button_container">
                        <button className="Twoside_button" onClick={handleToEmail}>이메일로 돌아가기</button>
                        <button className="Twoside_button" type="submit">LOGIN</button>
                    </div>
                </div>
            )}
        </form>
    );
};

export default LoginPage;


