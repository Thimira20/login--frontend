// src/components/Auth/Register.js
import React, { useState } from "react";
import { Button, TextField, Typography, Container } from "@mui/material";
import { register } from "../../services/authService";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(username, email, password);
      alert("Registration successful");
    } catch (error) {
      alert("Registration failed");
    }
  };

  return (
    <Container maxWidth="xs">
      <Typography variant="h4" component="h1" gutterBottom>
        Register
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Username"
          fullWidth
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          margin="normal"
          variant="outlined"
          required
        />
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
          Register
        </Button>
      </form>
    </Container>
  );
};

export default Register;
