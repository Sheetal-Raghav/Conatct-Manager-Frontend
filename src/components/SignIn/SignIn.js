import React, { useContext, useEffect, useState } from 'react'
import './SignIn.css';
import {AiFillEyeInvisible,AiFillEye} from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import {context} from '../ContextApi/context';

const SignIn = () => {
    const navigate=useNavigate();
    const {userSignIn}=useContext(context);
    const [userDetail,setUserDetail]=useState({email:'',password:''});
    const [error,setError]=useState({});
    const [submit,setSubmit]=useState(false);
    const [eyeClick,setEyeClick]=useState(true);
    const [passwordType,setPasswordType]=useState("password");

    const handleEyeClick=()=>{
        setEyeClick(false);
        if(eyeClick){
            setPasswordType("text");
        }else{
            setPasswordType("password");
            setEyeClick(true);
        }
    };

    const handleChange=(e)=>{
        setUserDetail({...userDetail,[e.target.name]:e.target.value});
    }

    const handleSubmit=(e)=>{
        e.preventDefault();
        setError(validate(userDetail));
        setSubmit(true);
    }

    useEffect(()=>{
        if(Object.keys(error).length===0 && submit){
            userSignIn(userDetail);
        }
    },[error]);

    const validate=(values)=>{
        const err={};
        const emailRegex=/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/i
        if(!values.email){
            err.email="*email is required";
        }
        else if(!emailRegex.test(values.email)){
            err.email="*email is invalid"
        }
        if(!values.password){
            err.password="*password is required";
        }
        return err;
    }

  return (
    <div className='white-container' >
        <img src="Images/Ellipse-31.png" alt="" className="top-circle" />
        <div className='signIn-container'>
            <img src="Images/Dots-Group.png" alt="" className='dots-1' />
            <div className='signIn-header'>
                <h4>Logo</h4>
                <p>Enter your credentials to access your account</p>
            </div>
            <form className="signIn-form" method="POST" onSubmit={handleSubmit}>
                <div className='email'>
                    <input className='email-input' type="text" name="email" placeholder="User ID" onChange={handleChange} />
                </div>
                <p style={{ color: "red" }}>{error.email}</p>
                <div className='password'>
                    <input className='password-input' type={passwordType} name="password" placeholder="Password" onChange={handleChange} />
                    {
                        (eyeClick)?   <AiFillEyeInvisible className='eye' onClick={handleEyeClick} />:<AiFillEye className='eye' onClick={handleEyeClick} />
                    }
                </div>
                <p style={{ color: "red" }}>{error.password}</p>
                <button className="button-1">Sign In</button>
            </form>
                <button className='button-2' onClick={()=>navigate('/register')}>Sign Up</button>
                <img src="Images/Dots-Group.png" alt="" className="dots-2" />
        </div>
        <img src="Images/Ellipse-32.png" alt="" className="bottom-circle" />
    </div>
  )
}

export default SignIn;