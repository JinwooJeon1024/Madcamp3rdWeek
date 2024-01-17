import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginSignUp.css';
import './HomePage.css';
import axios, { AxiosError } from 'axios';
import { useBackgroundImage } from '../recoil/WidgetList';

const SignUpPage: React.FC = () => {
    const navigate = useNavigate();
    console.log("signup page");
    const userToken = localStorage.getItem('userToken');
    const {backgroundImage, setBackgroundImage} = useBackgroundImage();


    const [userData, setUserData] = useState({
        name: '',
        email: '',
        password: ''
    });
    const [currentStep, setCurrentStep] = useState<'name' | 'email' | 'password'>('name');

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            switch (currentStep) {
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
        const { name, value } = e.target;
        setUserData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleToName = () => {
        setCurrentStep('name');
    };
    const handleToEmail = () => {
        setCurrentStep('email');
    };
    const handleToPassword = () => {
        setCurrentStep('password');
    };
    const handleToHome = () => {
        navigate('/');
    };


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/users/register`, userData);
            console.log("signup", response.data);
            navigate('/');
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const axiosError = error as AxiosError;
                if (axiosError.response) {
                    console.error("Error submitting form : ", error.response?.data);
                }
                else {
                    console.error("Unexpected error : ", error);
                }

            } else {
                console.error("Non-Axios error : ", error);
            }
        }
    };
    return (
        <div className="Container">
            <div className="Left">
                <img className="Home_logo" src={process.env.PUBLIC_URL + "/name.png"} alt="CANVAS" />
            </div>
            <div className="Right">
                <form onSubmit={handleSubmit}>
                    {currentStep === 'name' && (
                        <div className="Input_container">
                            <h1 className="Question">What is your Name?</h1>
                            <input
                                className="Input"
                                type="name"
                                name="name"
                                value={userData.name}
                                onChange={handleInputChange}
                                onKeyDown={handleKeyDown}
                                autoFocus />
                            <div className="Button_container">
                                <button className="Twoside_button" onClick={handleToHome}>back</button>
                                <button className="Twoside_button" onClick={handleToEmail}>next</button>
                            </div>
                        </div>
                    )}
                    {currentStep === 'email' && (
                        <div className="Input_container">
                            <h1 className="Question">{`What is your Email, ${userData.name}?`}</h1>
                            <input
                                className="Input"
                                type="email"
                                name="email"
                                value={userData.email}
                                onChange={handleInputChange}
                                onKeyDown={handleKeyDown}
                                autoFocus />
                            <div className="Button_container">
                                <button className="Twoside_button" onClick={handleToName}>back</button>
                                <button className="Twoside_button" onClick={handleToPassword}>next</button>
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
                                autoFocus />
                            <div className="Button_container">
                                <button className="Twoside_button" onClick={handleToEmail}>back</button>
                                <button className="Twoside_button" type="submit">sign up</button>
                            </div>
                        </div>
                    )}
                </form>
            </div>
        </div>

    );
};

export default SignUpPage;


