import React, { useState } from "react";
import { TextField, Button, Typography, Paper, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post("http://localhost:8000/token", credentials);
      localStorage.setItem("token", response.data.access_token);
      navigate("/chat"); // Redirect after login
    } catch (err) {
      setError("Invalid email or password.");
    }
  };

  return (
    <Box width="100%">
      <Paper sx={{ p: 4, textAlign: "center", width: "100%" }}>
        <Typography variant="h5" gutterBottom>Login</Typography>
        {error && <Typography color="error">{error}</Typography>}
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth label="Email" name="email" type="email"
            variant="outlined" margin="normal"
            value={credentials.email} onChange={handleChange}
          />
          <TextField
            fullWidth label="Password" name="password" type="password"
            variant="outlined" margin="normal"
            value={credentials.password} onChange={handleChange}
          />
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
            Login
          </Button>
          <Typography variant="body2" sx={{ mt: 2 }}>
            Don't have an account? <a href="/register">Register</a>
          </Typography>
        </form>
      </Paper>
    </Box>
  );
};

export default Login;
