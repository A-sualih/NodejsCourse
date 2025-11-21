const http = require("http");
const PORT = 3000;

const friends = [
  { id: 0, name: "Ahmed Sualih" },
  { id: 1, name: "Kerem Sualih Hussen" },
  { id: 3, name: "Zeinu Sualih" },
];

const server = http.createServer((req, res) => {
  const items = req.url.split("/");

  // POST /friends
  if (req.method === "POST" && items[1] === "friends") {
    req.on("data", (data) => {
      const friend = data.toString();
      console.log("Request:", friend);
      friends.push(JSON.parse(friend));
    });

    res.statusCode = 201;
    return res.end("Friend added");
  }

  // GET /friends or /friends/2
  else if (items[1] === "friends") {
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");

    if (items.length === 3) {
      const friendIndex = Number(items[2]);
      return res.end(JSON.stringify(friends[friendIndex]));
    }

    return res.end(JSON.stringify(friends));
  }

  // Other route
  res.statusCode = 404;
  res.end("Route not found");
});

server.listen(PORT, () => {
  console.log(`Listening on Port ${PORT}`);
});
