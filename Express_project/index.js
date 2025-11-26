const path=require("path")
const express = require("express");
const routers = require("./routes/usersrouter");
const messagerouters = require("./routes/messagesrouter");
const app = express();
const PORT = 3000;
app.use((req, res, next) => {
  console.log("Time", Date.now());
  next();
});
const users = [
  {
    id: 0,
    name: "Ahmed Sualih",
  },
  {
    id: 1,
    name: "Kurulus Osman",
  },
];
app.use((req, res, next) => {
  console.log(`${req.method} ${req.baseUrl} ${req.url}`);
  next();
});
app.use('/site', express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use("/users", routers);
app.use("/message", messagerouters);
app.post("/user", (req, res, next) => {
  if (!req.body.name) {
    res.status(400).json({ error: "MISSING Freind Name" });
  }
  const user = {
    name: req.body.name,
    id: users.length,
  };
  users.push(user);
  res.status(201).json({
    message: "User created successfully",
    user: user,
  });
});

app.listen(PORT, () => {
  console.log(`listening on Port ${PORT}`);
});
