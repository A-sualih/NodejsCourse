const path = require("path");
function getMessages(req, res) {
  
  res.sendFile(path.join(__dirname, "..", "public","images", "global.jpg"));
  console.log(__dirname)
  // res.send("<ul><li>Aselamu Aleykum Ana</li></ul>")
}
function postMessages(req, res) {
  console.log("updating messages...");
}
module.exports = {
  getMessages,
  postMessages,
};
