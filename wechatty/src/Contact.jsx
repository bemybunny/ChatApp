import React,{useState,useEffect} from 'react'
import './contact.css'
import { useNavigate } from 'react-router-dom';
const Contact = ({contacts,changeChat,currentUser}) => {
  const navigate= useNavigate();

  const [currentUserName,setCurrentUserName] = useState(undefined);
  const [currentUserImage,setCurrentUserUserImage] = useState(undefined);
  const [currentSelected,setCurrentSelected] = useState(undefined);

  useEffect(()=>{
    if(currentUser){
      //console.log({"currentUser":currentUser});
      setCurrentUserName(currentUser.name);
      setCurrentUserUserImage(currentUser.avatarImage)
    }
  },[currentUser])

  const changeCurrentChat = (index,contact)=>{
    //console.log("clicked");
    setCurrentSelected(index);
    changeChat(contact);
  }

  return (
    <>{
      contacts && ( <div className="contactContainer">
      <h1>WeChatty</h1>
      <div className="Contacts">

           {
          contacts.map((contact,index)=>{
            return (
              <div 
              className={`contact ${index===currentSelected?"selected":""}` }
              key={index} 
              onClick={(e) => changeCurrentChat(index, contact)}>
                <div className="avatar">
                  <img src={contact.avatarImage} alt="avatar"/>
                </div>
                <div className="username">
                  <h3>{contact.name}</h3>
                </div>
              </div>
            )
         })}
      </div>
      
      <div className="current-user">
          <div className="avatar">
             <img src={currentUserImage} alt="avatar"/>
          </div>
          <div className="username">
              <h3>{currentUserName}</h3>
          </div>

      </div>
    </div>)
    }</>
   
  )
}

export default Contact
