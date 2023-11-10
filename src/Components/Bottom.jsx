import {React,useEffect} from 'react';
import {AppBar} from '@mui/material';
import { Box, IconButton } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faComments } from '@fortawesome/free-solid-svg-icons';
import {Link} from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import "./Css/Chat.css";

const Bottom = () => {
  const receiveChat = () => {
    fetch("https://suresh28.pythonanywhere.com/receive_data")
      .then(response => {
        if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then((data)=>{
      if(data !== ''){
        const decoded = decodeCaesarCipher(data, shiftAmount);
        const chatContainer = document.querySelector('.chat');
        const messageWrapper = document.createElement('div');
        messageWrapper.classList.add('message-wrapper');
        const msg = document.createElement('div');
        msg.textContent = decoded;
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
    })
    .catch((error) => {
      console.error('Error receiving message: ' + error);
    });
  }
  const send = (message) => {
    let curl = window.location.href;
    console.log('Current URL:', curl);
    fetch("https://suresh28.pythonanywhere.com/receive_data",{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify([curl,message]),
  })
    .then(response => {
        if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .catch((error) => {
      console.error('Error sending message: ' + error);
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
  }, []);
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