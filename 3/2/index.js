const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const app = express();

app.use(express.json());

const secretKey = "SecretKey"

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/about', (req, res) => {
    res.send('About Us');
});

app.post('/signin', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    // const hashUsername = bcrypt.hashSync(username, 10);
    if (username === 'admin' && password === 'admin') {
        const token = jwt.sign({ username: username }, secretKey, { expiresIn: '1h' });
        res.status(200).send("Login Successfully : " + token)
    }
})

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});