import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';
import axios, {AxiosError} from 'axios';



const LoginPage: React.FC = () => {
    console.log("loginpage")
    const [userData, setUserData] = useState({
        name:'',
        email:'',
        password:''
    });
    const [step, setStep] = useState<number>(1);
    
    const navigate = useNavigate();
    const handleKeyDown = (e : React.KeyboardEvent<HTMLInputElement>) => {
        if(e.key === 'Enter'){
            setStep((prevStep)=>prevStep+1);
        };
    };
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserData({
            ...userData,
            [e.target.name]: e.target.value,
        });

    };
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try{
            const response = await axios.post('http://143.248.196.62:5000/api/users/login', userData);
            console.log(response.data);
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

            //에러코드 400이면 이메일 중복
        }
    };
    // const renderStep = () => {
    //     switch(step){
    //         case 1:
    //             return (
    //                 <div>
    //                     <p>step1</p>
    //                 </div>
    //             ); 
    //         case 2:
    //             return (
    //                 <div>
    //                     <p>step2</p>
    //                 </div>
    //             );
    //         case 3:
    //             return (
    //                 <div>
    //                     <p>step3</p>
    //                 </div>
    //             );
    //         default:
    //             return null;
    //     }
    // };
    return(
        <div className="Login_page">
            <div className="Login_container">
                <form onSubmit={handleSubmit}>
                    <h1>SIGN UP</h1>
                    <br/>
                    <input className="User_input" name="name" type="text" value={userData.name} onChange={handleChange} placeholder="name"/>
                    <br/>
                    <br/>
                    <input className="User_input" name="email" type="email" value={userData.email} onChange={handleChange} placeholder="email"/>
                    <br/>
                    <br/>
                    <input className="User_input" name="password" type="password" value={userData.password} onChange={handleChange} placeholder="password" onKeyDown={handleKeyDown}/>
                    <br/>
                    <br/>
                    <button type="submit">로그인</button>
                    <br/>
                    <br/>
                    <button>Sign up</button>
                </form>
            </div>
        </div>
    );
    // return (
    //     <form onSubmit={handleSubmit}>
    //         {renderStep()}
    //         {step === 3 && (
    //             <div>
    //                 <p>Sign Up Complete!</p>
    //             </div>
    //         )}           
    //     </form>
    // );
};

export default LoginPage;


