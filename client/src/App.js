import './App.css';

import io, { Socket } from "socket.io-client"
import {useState} from 'react'
import Chats from './Chat';

const socket = io.connect("http://localhost:3001")

function App() {
const [username,setUsername] =useState("")
const [room,setRoom] =useState("")

const joinRoom=() =>{
  if(username !== "" && room !==""){
    socket.emit("join_room", room)
  }
}
  return (
    <div className="App">
      <div className='joinChatContainer'>
      <h1>Join a chat</h1>
        <input 
        type="text" placholder="John..."
        onChange={(event)=>{
          setUsername(event.target.value)
        }}
        />
        <input 
        type="text" placholder="Room ID..."
        onChange={(event)=>{
        setRoom(event.target.value)
        }}
        />
        <input type="submit"
        value="submit"
        onClick={joinRoom}
        />
        </div>
    <Chats socket={socket} username={username} room={room}/>
    </div>
  );
}

export default App;
