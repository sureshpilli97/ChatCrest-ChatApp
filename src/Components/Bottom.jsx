import {React,useEffect} from 'react';
import {AppBar} from '@mui/material';
import { Box, IconButton } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faComments } from '@fortawesome/free-solid-svg-icons';
import {Link} from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import "./Css/Chat.css";

const Bottom = () => {
  const Identifier = uuidv4();
  const receiveChat = () => {
    fetch("https://suresh28.pythonanywhere.com/receive_data",{
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-Identifier': Identifier,
      }
    })
      .then(response => {
        if (!response.ok) {
        throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then((data)=>{
      if(data !== ''){
        const chatContainer = document.querySelector('.chat');
        const messageWrapper = document.createElement('div');
        messageWrapper.classList.add('message-wrapper');
        const msg = document.createElement('div');
        msg.textContent = data;
        msg.classList.add('box-msg');
        const timestamp = document.createElement('div');
        const now = new Date();
        const options = { hour: 'numeric', minute: '2-digit' };
        const timeString = now.toLocaleTimeString(undefined, options);
        timestamp.textContent = timeString;
        timestamp.classList.add('message-timestamp');
        msg.appendChild(timestamp);
        messageWrapper.appendChild(msg);
        chatContainer.appendChild(messageWrapper);
        chatContainer.scrollTop = chatContainer.scrollHeight;
      }
    });
  }
  const send = (message) => {
    fetch("https://suresh28.pythonanywhere.com/receive_data",{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Identifier': Identifier,
    },
    body: JSON.stringify(message),
  })
    .then(response => {
        if (!response.ok) {
        throw new Error('Network response was not ok');
        }
        return response.json();
    });
    const chatContainer = document.querySelector('.chat');
    const messageWrapper = document.createElement('div');
    messageWrapper.classList.add('message-wrapper');
    const msg = document.createElement('div');
    msg.textContent = message;
    msg.classList.add('box-msg-send');
    const timestamp = document.createElement('div');
    const now = new Date();
    const options = { hour: 'numeric', minute: '2-digit' };
    const timeString = now.toLocaleTimeString(undefined, options);
    timestamp.textContent = timeString;
    timestamp.classList.add('message-timestamp');
    msg.appendChild(timestamp);
    messageWrapper.appendChild(msg);
    chatContainer.appendChild(messageWrapper);
    chatContainer.scrollTop = chatContainer.scrollHeight;
  }
  const handleAddChat = () => {
    let message = document.querySelector('#msg').value;
    if (message) {
      send(message)
      document.querySelector('#msg').value = '';
    }
  };
  const addChat = (event) =>{
    if (event.key === 'Enter') {
      event.preventDefault();
      handleAddChat();
    }
  }
  useEffect(() => {
    const intervalId = setInterval(receiveChat, 2000); 
    return () => clearInterval(intervalId);
  });
  return (
    <>
      <AppBar position="fixed" color="primary" sx={{ top: 'auto', bottom: 0 }}>
        <Box sx={{ display: 'flex' }} className="Msg">
          <IconButton size="small" color="inherit" onClick={receiveChat} style={{ marginRight: 10 }}>
          <Link to="/" id='nav-name' >
            <FontAwesomeIcon icon={faComments} style={{color: "#ffffff",}} />
          </Link>
          </IconButton>
          <input id='msg' name='msg' type='text' placeholder='Type here....' onKeyDown={addChat} />
          <IconButton size="small" color="inherit" onClick={handleAddChat}  style={{ borderRadius: 20, textAlign: 'center', padding: "8px" }}>
            <FontAwesomeIcon icon={faPaperPlane} />
          </IconButton>
        </Box>
      </AppBar>
    </>
  );
}

export default Bottom;
