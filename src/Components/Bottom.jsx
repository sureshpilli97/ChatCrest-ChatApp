import React, { useEffect, useState } from 'react';
import { AppBar, Box, IconButton, Input } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faComments } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import './Chat.css';

const Bottom = () => {
  const Identifier = uuidv4();

  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState('');

  const receiveChat = () => {
    fetch(`https://suresh28.pythonanywhere.com/receive_data?identifier=${Identifier}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        if (data !== '') {
          setMessages([...messages, { content: data, sender: 'other' }]);
        }
      })
      .catch((error) => {
        console.error('Error receiving message: ' + error);
      });
  };

  const send = (message) => {
    fetch('https://suresh28.pythonanywhere.com/receive_data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Identifier': Identifier,
      },
      body: JSON.stringify({ message }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(() => {
        setMessages([...messages, { content: message, sender: 'you' }]);
        setMessageInput(''); // Clear the message input
      })
      .catch((error) => {
        console.error('Error sending message: ' + error);
      });
  };

  const handleAddChat = () => {
    if (messageInput) {
      send(messageInput);
    }
  };

  const addChat = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleAddChat();
    }
  };

  useEffect(() => {
    const intervalId = setInterval(receiveChat, 2000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <div className="chat">
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.sender}`}>
            {message.content}
          </div>
        ))}
      </div>
      <AppBar position="fixed" color="primary" sx={{ top: 'auto', bottom: 0 }}>
        <Box sx={{ display: 'flex' }} className="Msg">
          <IconButton size="small" color="inherit" onClick={receiveChat} style={{ marginRight: 10 }}>
            <Link to="/" id="nav-name">
              <FontAwesomeIcon icon={faComments} style={{ color: '#ffffff' }} />
            </Link>
          </IconButton>
          <Input
            id="msg"
            name="msg"
            type="text"
            placeholder="Type here...."
            onKeyDown={addChat}
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
          />
          <IconButton
            size="small"
            color="inherit"
            onClick={handleAddChat}
            style={{ borderRadius: 20, textAlign: 'center', padding: '8px' }}
          >
            <FontAwesomeIcon icon={faPaperPlane} />
          </IconButton>
        </Box>
      </AppBar>
    </>
  );
};

export default Bottom;
