import React, { useEffect, useState } from 'react';
import authService from '../appwrite/config';
import { ID } from 'appwrite';
import bg1 from '../images/bg1.jpg';
import conf from '../conf/conf';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload, faTrash } from '@fortawesome/free-solid-svg-icons';

const ClubChatBox = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [club, setClub] = useState("");
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    const getUser = async () => {
      try {
        const user = await authService.getCurrentUser();
        if (user) {
          const userEmail = user.email;
          const userProfileData = await authService.getProfile({ userEmail });
          setEmail(userProfileData.email);
          setUsername(userProfileData.name);
          setClub(userProfileData.club);
          console.log("Club set to:", userProfileData.club);
        }
      } catch (e) {
        console.error("Error fetching user profile:", e);
      }
    };
    getUser();
  }, []);

  useEffect(() => {
    if (club) {
      const unsubscribe = authService.client.subscribe(
        `databases.${conf.appwriteDatabaseId}.collections.${conf.appwriteCollectionId02}.documents`,
        (response) => {
          if (response.payload.club === club) {
            console.log("New message received:", response.payload);
            setMessages((prevMessages) => [...prevMessages, response.payload]);
          }
        }
      );

      return () => unsubscribe();
    }
  }, [club,setMessages]);


  useEffect(() => {
    if (club) {
      showMessages();
    }
  }, [club,setMessages]);

  const showMessages = async () => {
    try {
      const msg = await authService.showMessages({ club });
      console.log("Messages retrieved:", msg.documents);
      setMessages(msg.documents);
    } catch (e) {
      console.error("Error fetching messages:", e);
    }
  };

  const sendMessage = async () => {
    if (input.trim()) {
      const userId = ID.unique();
      const sentAt = new Date().toISOString();
      try {
        const user = await authService.createMessage({ ID: userId, email, name: username, message: input, club, sentAt });

        if (user) {
          console.log("Message sent successfully:", user);
          await showMessages();
        }
        setInput('');
      } catch (e) {
        console.error("Error sending message:", e);
      }
    }
  };

  const handleDelete = async (id) => {
    try {
      
      const del = await authService.deleteMessage(id); 
      
      if (del) {
        setMessages((prevMessages) => 
          prevMessages.map(msg => 
            msg.$id === id ? { ...msg, deleted: true } : msg
          )
        );
        console.log('Message deleted successfully:', id);
      }
  
      showMessages(); 
    } catch (e) {
      console.error('Error while deleting message:', e);
      alert('Failed to delete the message.');
    }
  };
  
  

  const formatDateTime = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleString('en-US', {
      timeZone: 'Asia/Kolkata',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    });
  };
  return (
    <div className="h-[calc(100vh-100px)] overflow-y-auto p-6 backdrop-filter backdrop-blur-sm bg-black bg-opacity-35 rounded-lg shadow-lg flex flex-col">
      <h2 className="font-bold mb-2 text-white text-2xl">Let's Chit Chat</h2>
      <div className="overflow-y-auto flex-grow  p-4 mb-4 rounded-lg backdrop-filter bg-white bg-opacity-10">
        {messages.map((message, index) => (
          <div key={index} className={`mb-3 p-3 rounded-lg w-fit max-w-[70%] shadow-md relative ${message.email === email ? "bg-fuchsia-200 ml-auto" : "bg-fuchsia-50"}`}>
            <strong className="text-purple-700">
              {message.email === email ? 'You' : message.name}:
            </strong>
            <span className="text-gray-800">{message.message}</span>
            <div className="text-xs text-gray-500 mt-0">{formatDateTime(message.sentAt)}</div>
            <button
                onClick={() => handleDelete(message.$id)}
                className={`absolute top-1 right-1 text-purple-700 p-2 rounded-full opacity-75 hover:opacity-100 flex items-center justify-center ${message.email === email ? "visible" : "hidden"}`}
                style={{ width: '20px', height: '20px', fontSize: '14px'}}
              >
                <FontAwesomeIcon icon={faTrash} />
              </button>
          </div>
        ))}
      </div>
      <div className="flex items-center">
        <input
          placeholder="Type something..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="border text-white p-3 rounded-l-lg flex-grow backdrop-filter backdrop-blur-sm bg-black bg-opacity-5"
        />
        <button
          onClick={sendMessage}
          className=" bg-gradient-to-r font-semibold from-pink-500 to-pink-600  hover:bg-gradient-to-r hover:from-pink-600 hover:to-pink-700 text-white px-6 py-3 rounded-r-lg"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ClubChatBox;
