// App.js

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import io from "socket.io-client";

const Chats = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const socket = io("http://localhost:3000");
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("login")) navigate("/chats");
    else navigate("/");
    socket.on("message", (msg) => {
      console.log("nosnosnoss", msg);
      setMessages((prevMessages) => [...prevMessages, msg]);
    });
  }, []);

  const sendMessage = () => {
    console.log("maina froma a a a  ");
    socket.emit("message", message);
    setMessage("");
  };

  return (
    <div>
      <div>
        {messages.map((msg, index) => (
          <div key={index}>
            <div>{msg}</div>
          </div>
        ))}
      </div>
      <div>
        <input
          type="text"
          value={message}
          style={{
            position: "fixed",
            bottom: "20px",
            height: "26px",
            width: "50vw",
            right: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              sendMessage();
            }
          }}
        />
      </div>
    </div>
  );
};

export default Chats;
