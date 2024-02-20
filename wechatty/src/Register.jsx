import React,{useState} from 'react'
import './register.css'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import {registerRoute} from './utils/APIRoutes.jsx';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
const Register = () => {

    const navigate = useNavigate();

    const [formdata,setFormData] = useState(
        {
            name:"",
            email:"",
            password:"",
            confirm_password:""
        }
    )

    const toastoption = {
        position:"bottom-right",
        autoClose:8000,
        pauseOnHover:true,
        draggable:true,
        theme :"dark",
    }

    const handlechange = (e) => {
        setFormData({...formdata,[e.target.name]:e.target.value})
    }

    const handleValidation=() => {
        const {name,email,password,confirm_password} = formdata;
        if(password !== confirm_password){
            toast.error("password and confirm password should be same.", toastoption);
            return false;
        }else if(password.length<8){
            toast.error("password should be greater or equal to 8 characters", toastoption);
            return false;
        }else if(name.length<3){
            toast.error("username should be greater than 3 characters", toastoption);
            return false;
        }else if(email===""){
            toast.error("email is required", toastoption);
            return false;
        }
        return true;
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        const {name,email,password} = formdata;
        if(handleValidation()){
            const {data} = await axios.post(registerRoute,{
                name,
                email,
                password,
            });
            if(data.status===false){
                toast.error(data.msg,toastoption);
            }
            if(data.status===true){
                localStorage.setItem('chat-app-user',JSON.stringify(data.user));
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
            name="email"
            placeholder="Email" 
            onChange={(e)=>handlechange(e)}
        />
        <input 
            name="password"
            placeholder="Password" 
            onChange={(e)=>handlechange(e)}
        />
        <input 
            name="confirm_password"
            placeholder="Confirm Password" 
            onChange={(e)=>handlechange(e)}
        />
        <button type="submit">Create User</button>
        <span>Already Have an Account ? <Link to ='/register' style={{color:'blue'}}>Login</Link></span>
      </form>
    </div>
  )
}

export default Register
