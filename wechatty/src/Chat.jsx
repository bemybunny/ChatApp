import React,{useState,useEffect} from 'react'
import './chat.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { allUserRoute} from './utils/APIRoutes.jsx';
import Contacts from './Contact.jsx'
import Welcome from './Welcome.jsx';
import ChatContainer from './ChatContainer.jsx';
const Chat = () => {

    const navigate= useNavigate();
    const [contacts,setContacts] = useState([]);
    const [currentUser,setCurrentUser] = useState(undefined);
    const [currentChat,setCurrentChat] = useState(undefined);
    const [isloaded,setIsLoaded] = useState(false);

    useEffect(() => {
      async function fetchData(){
        try {
          if(!localStorage.getItem('chat-app-user')){
              navigate('/login');
          }else{
            const parsedUser = await JSON.parse(localStorage.getItem('chat-app-user'));
            if (!parsedUser) {
              console.error('Error parsing user data:', parsedUser);
              return;
            }
            setCurrentUser(parsedUser);
            setIsLoaded(true);
              navigate('/');
          }
        } catch (error) {
          console.error(error);
        }
      };
      fetchData();
    }, [navigate]);

    useEffect(() => {
      async function fetchData(){
        try {
          if(currentUser){
                    if(currentUser.isAvatarImageSet){
                      const data = await axios.get(`${allUserRoute}/${currentUser._id}`);
                      setContacts(data.data);
                    }else{
                      navigate('/setAvatar');
                    }
                  }
        } catch (error) {
          console.error(error);
        }
      };
      fetchData()
    },  [currentUser]);

const handleChatChange = (chat) => {
  setCurrentChat(chat);
}
//console.log(currentUser);
//console.log(currentChat);
  return (
    <div className="chatContainer">
      <div className="chatcontainer">
        <Contacts contacts = {contacts} currentUser= {currentUser} changeChat = {handleChatChange}/>
        {isloaded && currentChat===undefined?
        <Welcome currentUser= {currentUser} />:
        <ChatContainer currentChat= {currentChat} currentUser= {currentUser}/>}
      </div>

    </div>
  )
}

export default Chat
