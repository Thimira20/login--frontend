import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme"; // Import your custom theme
import Navbar from "./components/Navbar";
import Register from "./components/Auth/Register";
import Login from "./components/Auth/Login";
import Profile from "./components/Auth/Profile";
import PrivateRoute from "./components/PrivateRoute";

const App = () => {
  const [user, setUser] = useState(null); // State to manage the authenticated user

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Navbar user={user} setUser={setUser} />
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login setUser={setUser} />} />{" "}
          {/* Pass setUser */}
          <Route path="/" element={<h2>Home</h2>} />
          <Route
            path="/profile"
            element={
              <PrivateRoute user={user}>
                <Profile />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
