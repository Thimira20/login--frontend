// import React, { useEffect, useState } from "react";
// import { Container, Typography, Button, TextField } from "@mui/material";
// import { getUserData, createUserData } from "../../services/userDataService";
// import { getCurrentUser } from "../../services/authService";

// const Profile = () => {
//   const user = getCurrentUser();
//   const [userData, setUserData] = useState([]);
//   const [newData, setNewData] = useState("");

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const data = await getUserData();
//         setUserData(data);
//       } catch (error) {
//         console.error("Failed to fetch user data:", error);
//       }
//     };
//     fetchData();
//   }, []);

//   const handleAddData = async () => {
//     try {
//       const data = await createUserData({ data: newData });
//       setUserData((prevData) => [...prevData, data]);
//       setNewData("");
//     } catch (error) {
//       console.error("Failed to create user data:", error);
//     }
//   };

//   return (
//     <Container maxWidth="sm">
//       <Typography variant="h4" component="h1" gutterBottom>
//         Profile
//       </Typography>
//       <Typography variant="h6">Username: {user.username}</Typography>
//       <Typography variant="h6">Email: {user.email}</Typography>
//       <Typography variant="h6" component="h2" gutterBottom>
//         User Data:
//       </Typography>
//       <ul>
//         {userData.map((item, index) => (
//           <li key={index}>{item.data}</li>
//         ))}
//       </ul>
//       <TextField
//         label="Add New Data"
//         fullWidth
//         value={newData}
//         onChange={(e) => setNewData(e.target.value)}
//         margin="normal"
//         variant="outlined"
//       />
//       <Button onClick={handleAddData} variant="contained" color="primary">
//         Add Data
//       </Button>
//     </Container>
//   );
// };

// export default Profile;

import React, { useEffect, useState } from "react";
import { Container, Typography, Button, TextField } from "@mui/material";
import { getUserData, createUserData } from "../../services/userDataService";
import { getCurrentUser } from "../../services/authService";

const Profile = () => {
  const user = getCurrentUser();
  const [userData, setUserData] = useState([]);
  const [newData, setNewData] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getUserData();
        if (data && Array.isArray(data)) {
          setUserData(data);
        } else {
          console.error("Unexpected data format:", data);
        }
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };
    fetchData();
  }, []);

  const handleAddData = async () => {
    if (!newData) {
      alert("Please enter some data to add.");
      return;
    }
    try {
      const data = await createUserData({ data: newData });
      if (data && data.data) {
        setUserData((prevData) => [...prevData, data.data]);
        setNewData("");
      } else {
        console.error("Unexpected response format:", data);
      }
    } catch (error) {
      console.error("Failed to create user data:", error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" component="h1" gutterBottom>
        Profile
      </Typography>
      <Typography variant="h6">Username: {user?.username || "N/A"}</Typography>
      <Typography variant="h6">Email: {user?.email || "N/A"}</Typography>
      <Typography variant="h6" component="h2" gutterBottom>
        User Data:
      </Typography>
      <ul>
        {userData.length > 0 ? (
          userData.map((item, index) => <li key={index}>{item.data}</li>)
        ) : (
          <Typography>No data available</Typography>
        )}
      </ul>
      <TextField
        label="Add New Data"
        fullWidth
        value={newData}
        onChange={(e) => setNewData(e.target.value)}
        margin="normal"
        variant="outlined"
      />
      <Button onClick={handleAddData} variant="contained" color="primary">
        Add Data
      </Button>
    </Container>
  );
};

export default Profile;
