import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';
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
                    handleEmailSubmit();
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

    const handleEmailSubmit = ()=>{
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
                <div>
                    <label>
                        Enter Your Email
                        <input 
                            type="email"
                            name="email"
                            value={userData.email}
                            onChange={handleInputChange}
                            onKeyDown={handleKeyDown}/>
                    </label>
                    <br />
                    <button onClick={handleToHome}>홈으로 돌아가기</button>
                </div>
            )}
            {currentStep === 'password' && (
                <div>
                    <label>
                        Enter Your Password
                        <input 
                            type="password"
                            name="password"
                            value={userData.password}
                            onChange={handleInputChange}
                            onKeyDown={handleKeyDown}/>
                    </label>
                    <button type="submit">LOGIN</button>
                    <br />
                    <button onClick={handleToEmail}>이메일로 돌아가기</button>
                </div>
            )}
        </form>
    );
};

export default LoginPage;


