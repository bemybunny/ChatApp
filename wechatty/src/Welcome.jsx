import React from 'react'
import Robot from './assets/robot.gif'
import './welcome.css'
const Welcome = ({currentUser}) => {
  return (
    <div className="welcome">
      <img src={Robot} alt=""/>
      <h1>Welcome ,<span className="welcomSpan">{currentUser.name}!</span></h1>
      <h3>Please select a chat to Start Messaging</h3>
    </div>
  )
}

export default Welcome
