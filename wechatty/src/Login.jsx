import React,{useState,useEffect} from 'react'
import './register.css'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import {loginRoute} from './utils/APIRoutes.jsx';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {

    const navigate = useNavigate();

    const [formdata,setFormData] = useState(
        {
            name:"",
            password:"",
        }
    )

    const toastoption = {
        position:"bottom-right",
        autoClose:8000,
        pauseOnHover:true,
        draggable:true,
        theme :"dark",
    }

    useEffect(()=>{
        if(localStorage.getItem('chat-app-user')){
            navigate('/')
        }
    },[])

    const handlechange = (e) => {
        setFormData({...formdata,[e.target.name]:e.target.value})
    }

    const handleValidation=() => {
        const {name,password} = formdata;
        if(password===""){
            toast.error("Email and Password is required", toastoption);
            return false;
        }else if(name.length===""){
            toast.error("Email and Password is required", toastoption);
            return false;
        }
        return true;
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        const {name,password} = formdata;
        if(handleValidation()){
            const {data} = await axios.post(loginRoute,{
                name,
                password,
            });
            if(data.status===false){
                toast.error(data.msg,toastoption);
            }
            if(data.status===true){
                localStorage.setItem('chat-app-user',JSON.stringify(data.user));
                console.log('Data stored in localStorage',data.user);
                navigate('/')
            }
        }
    }

  return (
    <div className="formData">
      <form className="form" onSubmit={(e)=>{handleSubmit(e)}}>
        <div className="formdata_heading">
            <h1>weChatty</h1>
        </div>
        <input 
            name="name"
            placeholder="Name" 
            onChange={(e)=>handlechange(e)}
        />
        <input 
            name="password"
            placeholder="Password" 
            onChange={(e)=>handlechange(e)}
        />
        <button type="submit">Login In</button>
        <span>Don't have an account ? <Link to ='/register' style={{color:'blue'}}>Register</Link></span>
      </form>
    </div>
  )
}

export default Login
