import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import './SetAvatar.css';
import collection from './assets/collec.jsx'
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { setAvatarRoute } from './utils/APIRoutes.jsx';
const SetAvatar = () => {
    const navigate = useNavigate();

    const [randomImages, setRandomImages] = useState([]);
    const [selectedAvatar,setSelectedAvatar] = useState(undefined);
    
    useEffect(() => {
        const checkUser = async () => {
            if (!localStorage.getItem('chat-app-user')) {
                navigate('/login');
            }
        };
    
        checkUser();
    }, []);

    const toastoption = {
        position: 'bottom-right',
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: 'dark',
    };
     
    const uploadImage = async()=>{
        try{
            if(selectedAvatar==undefined){
                toast.error('please select the avatar',toastoption);
            }else{
                const user = await JSON.parse(localStorage.getItem('chat-app-user'));
                const imagePath = randomImages[selectedAvatar].image;
                console.log(randomImages[selectedAvatar]);
                const base64 = await convertPathToBase64(imagePath);
                const response =await axios.post(`${setAvatarRoute}/${user._id}`,{
                    image:base64
                })
                console.log('Response:', response);
                console.log(response);
                const userData = await response.data;
                const { isSet, image } = userData;
                if(isSet){
                    user.isAvatarImageSet=isSet;
                    user.avatarImage = image;
                    localStorage.setItem('chat-app-user',JSON.stringify(user));
                    navigate('/');
                }
            }
        }catch(error){
            console.log(error);
        }
        
    }

    useEffect(()=>{
        const fetchData = ()=>{
            const shuffleArray = (arr) => {
                const shuffled = [...arr];
                for (let i = shuffled.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
                }
                return shuffled;
            };
            const getRandomSubset = (arr, count) => {
                const shuffled = shuffleArray(arr);
                return shuffled.slice(0, count);
            };
            const newrandomImages = getRandomSubset(collection,4);
            setRandomImages(newrandomImages);
        }
        fetchData();
    },[])
    
        return (
                <>
                    <div className="container">
                        <div className="title-container">
                            <h1>Pick an avatar as your profile picture</h1>
                        </div>
                        <div className="avatar">
                            {
                                randomImages.map((item, index) => {
                                    return (
                                        <div key={index} className={`selectimage ${selectedAvatar===index ? "borderimage":""}`}>
                                            <img className={`avatarimage `} src={item.image} alt="" onClick={()=>setSelectedAvatar(index)}/>
                                        </div>
                                    );
                                })
                            }
                        </div>
                        <button className="submit-btn" onClick={uploadImage}>Set as Profile Picture</button>
                    </div>
                    <ToastContainer />
                </>
            );
        };

export default SetAvatar


async function convertPathToBase64(imagePath) {
    try {
        const response = await fetch(imagePath);
        const blob = await response.blob();

        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(blob);
            fileReader.onload = () => {
                resolve(fileReader.result);
            };
            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    } catch (error) {
        console.error('Error converting path to base64:', error);
        throw error;
    }
}