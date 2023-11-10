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
  const shiftAmount = 3;
  const encodeCaesarCipher = (input, shift) => {
    return input
      .split('')
      .map(char => {
        if (char.match(/[a-z]/i)) {
          const code = char.charCodeAt(0);
          const offset = code < 91 ? 65 : 97;
          return String.fromCharCode((code - offset + shift) % 26 + offset);
        } else {
          return char;
        }
      })
      .join('');
  };

  const decodeCaesarCipher = (encoded, shift) => {
    return encoded
      .split('')
      .map(char => {
        if (char.match(/[a-z]/i)) {
          const code = char.charCodeAt(0);
          const offset = code < 91 ? 65 : 97;
          return String.fromCharCode((code - offset - shift + 26) % 26 + offset);
        } else {
          return char;
        }
      })
      .join('');
  };
  const receiveChat = () => {
    fetch(`https://suresh28.pythonanywhere.com/receive?identifier=${Identifier}`)
    .then((response) => {
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
    const encoded = encodeCaesarCipher(message, shiftAmount);
    fetch('https://suresh28.pythonanywhere.com/receive', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Identifier': Identifier,
      },
      body: JSON.stringify({ "message":encoded }),
    })
    .then((response) => {
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