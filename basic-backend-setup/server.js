const express = require('express');

const app = express();
const PORT = 3002;

app.use(express.json());

let data = [];


app.get('/', (req, res) => {
  res.send(`
    <h1>Hello</h1>
    <a href="/user">User page</a>
  `);
});

app.get('/user', (req, res) => {
  res.send(`
    <h1>User Details</h1>
    <ul>
      <li>Name: ${data.name}</li>
      <li>Age: ${data.age}</li>
      <li>Email: ${data.email}</li>
    </ul>
    <a href="/">Go back</a>
  `);
});

app.get('/api/users', (req, res) => {
  res.send(data);
});

app.get("/api/user", (req, res) => {
  const { id } = req.query;
  const filteredUsers = data.filter((user) => user.id === parseInt(id));
  res.json(filteredUsers);
});

app.post("/api/user", (req, res) => {
  const userData = req.body;
  res.send(userData);
});

app.delete("/api/users", (req, res) => {
  const deleteData = data.pop();
  res.send(deleteData);
});

app.delete("/api/user", (req, res) => {
  const { id } = req.query;
  const userId = parseInt(id);
  const originalLength = data.length;
  data = data.filter((user) => user.id !== userId);

  if (data.length < originalLength) {
    res.json({
      message: `User with ID ${userId} deleted successfully`,
      remainingUsers: data,
    });
  } else {
    res.status(404).json({ message: `User with ID ${userId} not found` });
  }
});


app.listen(PORT, () => {
  console.log(`Server is running on :${PORT}`);
});
