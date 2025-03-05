import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ChatApp from "./components/ChatApp.js";
import Login from "./pages/Login.js";
import Register from "./pages/Register.js";
import Navbar from "./components/Navbar.js";
import { CssBaseline, Container, Box } from "@mui/material";

function App() {
  return (
    <Router>
      <CssBaseline />
      {/* <Navbar /> */}
      <Container maxWidth="sm">
        <Box display="flex" justifyContent="center" alignItems="center" height="90vh">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/chat" element={<ChatApp />} />
          </Routes>
        </Box>
      </Container>
    </Router>
  );
}

export default App;
