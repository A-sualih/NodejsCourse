const express = require('express');
const app = express();
app.use(express.json());

// ✅ Global array to store users (persists between requests)
let allUsers = [];

// POST route - add users
app.post("/users", (req, res) => {
  const { users } = req.body;

  const createdPlace = users.map(user => ({
    id: user.id,
    name: user.name,
    livenow: user.livenow
  }));

  // ✅ Add to global array
  allUsers.push(...createdPlace);
  
  res.status(201).json({ 
    message: "Users Created Successfully", 
    place: allUsers 
  });
});
// ✅ GET route - retrieve all users
app.get("/users", (req, res) => {
  res.status(200).json({ 
    message: "Users retrieved successfully",
    places: allUsers,
    count: allUsers.length
  });
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});