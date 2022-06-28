import React,{useEffect, useState} from 'react'
function Chat({socket, username, room}) {
  const [currentMessage, setCurrentMessage] =useState('')
  const [Messagelist, setMessageList] =useState([])

  const sendMessage = async() =>{
    if (currentMessage !== ""){
      const messageData={
        room: room,
        author: username,
        message:currentMessage,
        time:
        new Date(Date.now()).getHours() +
        ":" +
        new Date(Date.now()).getMinutes(),
      };
       await socket.emit("send_message", messageData)
       setMessageList((list) => [...list, messageData])

    }
  }

useEffect(() => {
  socket.on("recieve_message",(data)=>{
    setMessageList((list) => [...list, data])
  })
},[socket]);

  return (
    <div className='chat-window'>
      <div className='chat-header'>
        <p>Live Chat</p>
      </div>
      <div className='chat-body'>
      {Messagelist.map((messagecontent)=>{
        return (
        <div className='message'
        id={username === messagecontent.author ? "you" : "other"}> 
          <div> 
            <div className='message-content'>
             <p>{messagecontent.message}</p> 
            </div>
            <div className='message-meta'>
              <p id="time">{messagecontent.time}</p>
              <p id="author">{messagecontent.author}</p>
            </div>
          </div>
        </div> )
      })}
      </div>
      <div className='chat-footer'>
        <input type="text" placeholder='Hey...' 
         onChange={(event)=>{
          setCurrentMessage(event.target.value)
          }}
          onKeyPress={(event) =>{
            event.key === "Enter" && sendMessage()
          }}
        />
        <button onClick={sendMessage}>&#9658;</button>
      </div>
    </div>
  )
}

export default Chat
