import React, { useContext, useEffect, useState } from 'react';
import {context} from '../ContextApi/context';

const SignUp = () => {

    const {userSignUp}=useContext(context);
    const [isSubmit,setIsSubmit]=useState(false);
    const [formErr,setFormErr]=useState({});
    const [userData,setUserData]=useState({email:'',password:'',conformPass:''});
    
    const handleChange=(e)=>{
        const {name,value}=e.target;
        setUserData({...userData,[name]:value});
    };

    const handleSubmit=(e)=>{
        e.preventDefault();
        setFormErr(validate(userData));
        setIsSubmit(true);
    };

    useEffect(()=>{
        if(Object.keys(formErr).length ==0 && isSubmit){
            userSignUp(userData);
        }
    },[formErr]);

    const validate=(values)=>{
        const err={};
        const emailRegex=/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/i
        if(!values.email){
            err.email="*email is required";
        }
        else if(!emailRegex.test(values.email)){
            err.email="*email is invalid";
        }
        if(values.password.length < 6){
            err.password="*password must contain atleast 6 characters";
        }
        else if(values.password.length > 12){
            err.password="*password must contain max 12 characters";
        }
        if(values.conformPass !== values.password){
            console.log(values.conformPass,values.password);
            err.conformPass="*password does'nt matched!!!";
        }
        return err;
    }

  return (
    <>
        <div className='white-container'>
            <img src="Images/Ellipse-31.png" alt="" className='top-circle' />
            <div className='signIn-container'>
                <img src="Images/Dots-Group.png" alt="" className='dots-1' />
                <div className='signIn-header'>
                    <h4>Logo</h4>
                    <p>Create New Account</p>
                </div>
                <form method="POST" className="signIn-form" onSubmit={handleSubmit}>
                    <div className='email'>
                        <input className='email-input' type="text" name="email" placeholder="Mail ID" onChange={handleChange} />
                    </div>
                    <p className='errors' style={{ color: "red" }}>{formErr.email}</p>
                    <div className='password' style={{position:"relative"}}>
                        <input className='password-input' type="password" name="password" placeholder="Password" onChange={handleChange} />
                    </div>
                    <p className="errors" style={{ color: "red" }}>{formErr.password}</p>
                    <div className='password' style={{ position: "relative" }}>
                        <input className='password-input' type="password" name="conformPass" placeholder="Confirm Password" onChange={handleChange} />
                    </div>
                    <p className="errors" style={{ color: "red" }}>{formErr.conformPass}</p>
                    <button className="button-1">Sign Up</button>
                </form>
                <img src="Images/Dots-Group.png" alt="" className='dots-2' />
            </div>
            <img src="Images/Ellipse-32.png" alt="" className='bottom-circle' />
        </div>
    </>
  )
}

export default SignUp