// src/components/Auth/Login.js
import React, { useState } from "react";
import { Button, TextField, Typography, Container } from "@mui/material";
import { login } from "../../services/authService";
import { useNavigate } from "react-router-dom";

const Login = ({ setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const user = await login(email, password);
  //     setUser(user);
  //     alert("Login successful");
  //   } catch (error) {
  //     alert("Login failed");
  //   }
  // };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Check if email is defined and is a string
      if (!email || typeof email !== "string") {
        throw new Error("Invalid email");
      }
      const normalizedEmail = email.trim().toLowerCase(); // Safely use toLowerCase
      const user = await login(normalizedEmail, password);
      setUser(user);
      alert("Login successful");
      navigate("/profile");
    } catch (error) {
      console.log("Login error:", error); // Log the error for debugging
      alert("Login failed");
    }
  };

  return (
    <Container maxWidth="xs">
      <Typography variant="h4" component="h1" gutterBottom>
        Login
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Email"
          type="email"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          margin="normal"
          variant="outlined"
          required
        />
        <TextField
          label="Password"
          type="password"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          margin="normal"
          variant="outlined"
          required
        />
        <Button type="submit" fullWidth variant="contained" color="primary">
          Login
        </Button>
      </form>
    </Container>
  );
};

export default Login;
