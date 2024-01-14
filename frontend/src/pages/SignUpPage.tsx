import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginSignUp.css';
import axios, {AxiosError} from 'axios';



const SignUpPage: React.FC = () => {
    const navigate = useNavigate();
    console.log("signup page");


    const [userData, setUserData] = useState({
        name:'',
        email:'',
        password:''
    });
    const [currentStep, setCurrentStep] = useState<'name' | 'email' | 'password'>('name');

    const handleKeyDown = (e : React.KeyboardEvent<HTMLInputElement>) => {
        if(e.key === 'Enter'){
            e.preventDefault();
            switch(currentStep){
                case 'name':
                    handleToEmail();
                    break;
                case 'email':
                    handleToPassword();
                    break;
                case 'password':
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

    const handleToName =() =>{
        setCurrentStep('name');
    };
    const handleToEmail = ()=>{
        setCurrentStep('email');
    };
    const handleToPassword = () =>{
        setCurrentStep('password');
    };
    const handleToHome =() =>{
        navigate('/');
    };


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try{
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/users/register`, userData);
            console.log(response.data);
            navigate('/main');
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
            {currentStep === 'name' && (
                <div className="Input_container">
                    <h1 className="Question">What is your NAME?</h1>
                    <input 
                        className="Input"
                        type="name"
                        name="name"
                        value={userData.name}
                        onChange={handleInputChange}
                        onKeyDown={handleKeyDown}
                        autoFocus/>
                    <div className="Button_container">
                        <button className="Twoside_button"onClick={handleToHome}>홈으로 돌아가기</button>
                        <button className="Twoside_button" onClick={handleToEmail}>다음으로 이동</button>   
                    </div>
                </div>
            )}
            {currentStep === 'email' && (
                <div className="Input_container">
                    <h1 className="Question">Enter Your Email</h1>
                    <input 
                        className="Input"
                        type="email"
                        name="email"
                        value={userData.email}
                        onChange={handleInputChange}
                        onKeyDown={handleKeyDown}
                        autoFocus/>
                    <div className="Button_container">
                        <button className="Twoside_button" onClick={handleToName}>이전으로 돌아가기</button>
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
                        onKeyDown={handleKeyDown}
                        autoFocus/>
                    <div className="Button_container">
                        <button className="Twoside_button" onClick={handleToEmail}>이전으로 돌아가기</button>  
                        <button className ="Twoside_button" type="submit">회원가입 완료</button>  
                    </div>
                </div>
            )}
        </form>
    );
};

export default SignUpPage;


