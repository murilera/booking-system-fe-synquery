import React, { useState, useEffect, useRef } from "react";
import { Container, Paper, TextField, IconButton, Typography, Button, Box, AppBar, Toolbar } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ChatApp = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Welcome! You can book a technician, check your existing bookings, or cancel a booking. How can I assist you today?" },
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);

    try {
      const response = await axios.post(
        "http://localhost:8000/ai/bookings/",
        { user_input: input },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      const botMessage = { sender: "bot", text: response.data.message };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      setMessages((prev) => [...prev, { sender: "bot", text: "Error connecting to server." }]);
    }
    setInput("");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <Container maxWidth="md" sx={{ display: "flex", flexDirection: "column", height: "100vh", justifyContent: "center", alignItems: "center" }}>
      <AppBar position="fixed">
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6">Technician Scheduler</Typography>
          <Button color="inherit" onClick={handleLogout}>Logout</Button>
        </Toolbar>
      </AppBar>
      <Paper sx={{ p: 3, width: "100%", maxWidth: "600px", height: "70vh", overflowY: "auto", mt: 10, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
        <Typography variant="h6" gutterBottom textAlign="center">Technician Chat Support</Typography>
        <Box sx={{ flexGrow: 1, overflowY: "auto", p: 2, maxHeight: "50vh" }}>
          {messages.map((msg, index) => (
            <Box
              key={index}
              sx={{
                display: "flex",
                justifyContent: msg.sender === "user" ? "flex-end" : "flex-start",
                mb: 1,
              }}
            >
              <Typography
                sx={{
                  backgroundColor: msg.sender === "user" ? "#d2f6b8": "#d1e2ef",
                  borderRadius: "10px",
                  p: 1,
                  maxWidth: "75%",
                  wordWrap: "break-word",
                  whiteSpace: "pre-wrap",
                  display: "inline-block",
                }}
              >
                {msg.text}
              </Typography>
            </Box>
          ))}
          <div ref={messagesEndRef} />
        </Box>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSend()}
          sx={{ mt: 1 }}
          InputProps={{
            endAdornment: (
              <IconButton onClick={handleSend}>
                <SendIcon />
              </IconButton>
            ),
          }}
        />
      </Paper>
    </Container>
  );
};

export default ChatApp;
