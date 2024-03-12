import React,{useState,useEffect} from 'react'
import './chatcontainer.css'
import Logout from './Logout';
import ChatInput from './ChatInput';
import axios from 'axios';
import { getAllMessageRoute, sendMsgRoute } from './utils/APIRoutes';

const ChatContainer = ({currentChat,currentUser}) => {

  const [messages,setMessages] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(getAllMessageRoute, {
          params: {
            from: currentUser._id,
            to: currentChat._id,
          },
        });
        //console.log(response);
        if (Array.isArray(response.data.projectMessage)) {
          setMessages(response.data.projectMessage);
        }  else {
          console.error('Invalid API response:', response.data);
        }    
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchData();
  }, [currentChat]);

  //console.log({"messages":messages});

  const handleSendMsg = async(msg) => {
    try{
      console.log({"currentUser._id":currentUser._id});
      console.log({"currentChat._id":currentChat._id});
      await axios.post(sendMsgRoute,{
        from:currentUser._id,
        to:currentChat._id,
        message:msg,
      })
    const msgs = [...messages];
    msgs.push({ fromSelf: true, message: msg });
    setMessages(msgs);
    }catch(err){
      console.log(err);
    }
  }

  return (
    <>{
      currentChat && (
          <div className= "chatbox">
            <div className="chat-header">
                <div className="user-details">
              <div className="Chatavatar">
                  <img src={currentChat.avatarImage} alt="avatar"/>
              </div>
                  <div className="username">
                      <h3>{currentChat.name}</h3>
                  </div>
                </div>
                <div><Logout/></div>
            </div>
            <div className="chatMessages">
              {
                messages.map((message,id)=>{
                  console.log(message);
                  return (
                    <div className="messagecnt">
                    <p className={message.fromSelf===true?'send':'recieve'}>{message.message}</p>
                    </div>
                  )
                })
              }
            </div>
            <ChatInput handleSendMsg={handleSendMsg}/>
          </div>
      )
    }</>
      
  )
}

export default ChatContainer
  
