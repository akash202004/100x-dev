const express = require("express");
const jwt = require("jsonwebtoken");
const jwtPassword = "123456";

const app = express();
app.use(express.json());

const ALL_USERS = [
    {
        username: "harkirat@gmail.com",
        password: "123",
        name: "harkirat singh",
    },
    {
        username: "raman@gmail.com",
        password: "123321",
        name: "Raman singh",
    },
    {
        username: "priya@gmail.com",
        password: "123321",
        name: "Priya kumari",
    },
];


const userExists = (username, password) => {
    let user = false;
    for (let i = 0; i < ALL_USERS.length; i++) {
        if (username === ALL_USERS[i].username && password === ALL_USERS[i].password) {
            user = true;
        }
        return user;
    }
}

app.post("/signin", (req, res) => {
    const { username, password } = req.body;

    if (!userExists(username, password)) {
        return res.status(401).json({ message: "Invalid username or password" });
    }

    var token = jwt.sign({ username: username }, jwtPassword);

    res.status(200).json({ token: token });
})

app.get("/users", (req, res) => {
    const token = req.headers.authorization;
    try {
        const verify = jwt.verify(token, jwtPassword);
        const username = verify.username;
        res.status(200).json({ users: ALL_USERS.filter(user => user.username === username) });
    } catch (error) {
        res.status(401).json({ message: "Unauthorized" });
    }
})

app.get("/", (req, res) => {
    res.send("Hello World");
})

app.listen(3000, () => {
    console.log("Server is running on port 3000");
})