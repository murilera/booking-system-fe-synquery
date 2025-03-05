import React, { useState } from "react";
import { TextField, Button, Typography, Paper, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      await axios.post("http://localhost:8000/users/", formData);
      setSuccess("Registration successful! Redirecting...");
      setTimeout(() => navigate("/"), 2000); // Redirect to login
    } catch (err) {
      setError("Email already in use.");
    }
  };

  return (
    <Box width="100%">
      <Paper sx={{ p: 4, textAlign: "center", width: "100%" }}>
        <Typography variant="h5" gutterBottom>Register</Typography>
        {error && <Typography color="error">{error}</Typography>}
        {success && <Typography color="success.main">{success}</Typography>}
        <form onSubmit={handleSubmit}>
          <TextField fullWidth label="Email" name="email" type="email"
            variant="outlined" margin="normal"
            value={formData.email} onChange={handleChange} />
          <TextField fullWidth label="Password" name="password" type="password"
            variant="outlined" margin="normal"
            value={formData.password} onChange={handleChange} />
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
            Register
          </Button>
          <Typography variant="body2" sx={{ mt: 2 }}>
            Already have an account? <a href="/">Login</a>
          </Typography>
        </form>
      </Paper>
    </Box>
  );
};

export default Register;
