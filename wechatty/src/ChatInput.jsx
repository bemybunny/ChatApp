import React,{useState} from 'react'
import Picker from 'emoji-picker-react';
import {IoMdSend} from 'react-icons/io';
import {BsEmojiSmileFill} from 'react-icons/bs';
import './chatinput.css'

const ChatInput = ({handleSendMsg}) => {
    //const [showEmojiPicker,setShowEmojiPicker] = useState(false);
    const [msg,setMsg] = useState("");

    // const handleEmojiPicker = () => {
    //     setShowEmojiPicker (!showEmojiPicker)
    // }
    // const handleEmojiClick = (event,emoji) => {
    //     console.log(emoji);
    //     const updatedMsg = msg + emoji.target.img;
    //     setMsg(updatedMsg);
    // }
     const sendChat = (event) =>{
        event.preventDefault();
        if(msg.length>0){
            handleSendMsg(msg);
            setMsg('');
        }
     }
  return (
    <div className="chatinputcontainer">
        <div className="button-container"> 
            {/* <div className="emoji">
                <BsEmojiSmileFill onClick = {handleEmojiPicker}/>
                {showEmojiPicker && <Picker className="emoji-picker-react" onEmojiClick={handleEmojiClick}/>}
            </div> */}
        </div>
        <form className="input-container" onSubmit={(e)=>{sendChat(e)}}>
            <input type="text" placeholder="type your message here" value={msg} onChange= {(e)=>setMsg(e.target.value)}/>
            <button className="chatinputbutton" type="submit">
                <IoMdSend/>
            </button>
        </form>
    </div>

  )
}

export default ChatInput
