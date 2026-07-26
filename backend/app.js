const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

let messages = [
  { id: 1, username: 'Shu', text: 'Hello React!' },
];

app.get('/api/messages', (req, res) => {
  res.json(messages);
});

app.post('/api/messages', (req, res) => {
  const newMessage = {
    id: messages.length + 1,
    username: req.body.username,
    text: req.body.text,
  };
  messages.push(newMessage);
  res.json(newMessage);
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
