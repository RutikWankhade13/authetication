
const express = require('express');
const app = express();
const port = 3003;
const USERS = [];

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.get('/getUsers', (req, res) => {
  console.log(USERS);
  res.send(USERS);
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/start.html');
});

app.get('/signup', (req, res) => {
  res.sendFile(__dirname + '/signup.html');
});

app.post('/signup', (req, res) => {
  let email = req.body.Email;
  let password = req.body.Password;

  // Check if user exists or not
  let userExists = USERS.some((user) => user.email === email);

  if (userExists) {
    res.status(409).send('User already signed up');
  } else {
    // Create a new user object with the email and password (plaintext)
    const newUser = {
      email,
      password,
    };
    USERS.push(newUser);
    res.send(USERS);
  }
});

app.post('/login', function (req, res) {
  let email = req.body.Email;
  let password = req.body.Password;

  let userExists = USERS.some((user) => user.email === email);

  if (!userExists) {
    console.log('User does not exist');
  } else {
    let user = USERS.find((user) => user.email === email);

    if (user.password === password) {
      res.status(200).send('User login successfully');
    } else {
      res.status(401).send('Invalid password');
    }
  }
});

app.get('/login', (req, res) => {
  res.sendFile(__dirname + '/login.html');
});

app.get('/getuser', (req, res) => {
  res.send(USERS);
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })