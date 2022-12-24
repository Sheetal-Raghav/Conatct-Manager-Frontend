import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const context=createContext();

export const ContextProvider=(props)=>{
    const [email,setEmail]=useState("");
    const [contacts,setContacts]=useState([]);
    const [arrCheck,setArrCheck]=useState([]);
    const nav=useNavigate();

    const userSignIn= (loginData)=>{
        axios.post("https://contact-manager-backend-66c5.onrender.com/login",loginData)
        .then((res)=>{
            const token=res.data.token;
            localStorage.setItem("token",token);
            localStorage.setItem("email",loginData.email);
            nav("/contacts");
            window.alert("Login Successful");
            document.location.reload();
            setEmail(loginData.email);
        }).catch((err)=>{
            window.alert(err.response.data.error);
            console.log(err);
        });
    }

    const config={
        headers:{
            token:localStorage.getItem("token")
        }
    };

    const postContacts= async (ContactsData)=>{
        return await axios.post("https://contact-manager-backend-66c5.onrender.com/create",ContactsData,config)
        .then((res)=>console.log(res))
        .catch((err)=>{
            console.log(err.response.data.error);
        });
    };

    const fetchContacts=()=>{
        axios.get("https://contact-manager-backend-66c5.onrender.com/alluser",config)
        .then((res)=>{
            const data=res.data.users[0].contact;
            setContacts(data);
        })
        .catch((err)=>console.log(err));
    };

    useEffect(()=>{
        fetchContacts();
    },[]);

    const userSignUp=(userData)=>{
        try{
            axios.post("https://contact-manager-backend-66c5.onrender.com/register",userData)
            .then((res)=>{
                nav("/");
                window.alert("Registration Successful")
            })
            .catch((err)=>window.alert(err.response.data.error));
        }catch(e){
            window.alert(e.message);
        }
    };

    const deleteContacts=(userId)=>{
        axios.delete(`https://contact-manager-backend-66c5.onrender.com/delete/${userId}`,config)
        .then((res)=>console.log(res))
        .catch((e)=>console.log(e));
    };

    const myFunction=()=>{
        var input,filter,table,tr,td,i,txtValue;
        input=document.getElementById('myInput');
        filter=input.value.toUpperCase();
        table=document.getElementById("myTable");
        tr=table.getElementsByTagName("tr");

        for(i=0;i<tr.length;i++){
            td=tr[i].getElementsByTagName("td")[4];
            if(td){
                txtValue=td.textContent || td.innerText;
                if(txtValue.toUpperCase().indexOf(filter)>-1){
                    tr[i].style.display="";
                }else{
                    tr[i].style.display="none";
                }
            }
        }
    };

    return (
        <context.Provider value={
            {
                contacts,
                postContacts,
                userSignUp,
                userSignIn,
                email,
                fetchContacts,
                deleteContacts,
                arrCheck,
                setArrCheck,
                myFunction
            }
        }>
            {props.children}
        </context.Provider>
    )
}