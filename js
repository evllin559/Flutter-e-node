const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

let nextId = 3;
let users = [
  { id: 1, name: 'Ana', email: 'ana@email.com' },
  { id: 2, name: 'Joao', email: 'joao@email.com' }
];

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.get('/users', (req, res) => {
  res.json(users);
});

app.post('/users', (req, res) => {
  const { name, email } = req.body || {};
  if (!name || !email) {
    return res.status(400).json({ message: 'name and email are required' });
  }
  const user = { id: nextId++, name, email };
  users.push(user);
  res.status(201).json(user);
});

app.put('/users/:id', (req, res) => {
  const id = Number(req.params.id);
  const { name, email } = req.body || {};
  const index = users.findIndex(u => u.id === id);
  if (index === -1) {
    return res.status(404).json({ message: 'user not found' });
  }
  if (!name || !email) {
    return res.status(400).json({ message: 'name and email are required' });
  }
  users[index] = { id, name, email };
  res.json(users[index]);
});

app.delete('/users/:id', (req, res) => {
  const id = Number(req.params.id);
  const index = users.findIndex(u => u.id === id);
  if (index === -1) {
    return res.status(404).json({ message: 'user not found' });
  }
  const removed = users.splice(index, 1)[0];
  res.json(removed);
});

app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`);
});
