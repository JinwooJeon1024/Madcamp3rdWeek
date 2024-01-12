import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';
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
            switch(currentStep){
                case 'name':
                    handleNameSubmit();
                    break;
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
    const handleNameSubmit = () =>{
        setCurrentStep('email');
    };
    const handleEmailSubmit = ()=>{
        setCurrentStep('password');
    };
    const handleToName =() =>{
        setCurrentStep('name');
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
            const response = await axios.post('http://143.248.196.62:5000/api/users/register', userData);
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
            {currentStep === 'name' && (
                <div>
                    <label>
                        What is your NAME?
                        <input 
                            type="name"
                            name="name"
                            value={userData.name}
                            onChange={handleInputChange}
                            onKeyDown={handleKeyDown}/>
                    </label>
                    <br />
                    <button onClick={handleToHome}>홈으로 돌아가기</button>
                </div>
            )}
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
                    <button onClick={handleToName}>이름으로 돌아가기</button>
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
                    <button type="submit">회원가입 완료</button>
                    <br />
                    <button onClick={handleToEmail}>이메일로 돌아가기</button>
                </div>
            )}
        </form>
    );
};

export default SignUpPage;


