const express = require('express');

const app = express();
let errCount = 0;

app.get("/", (req, res) => {
    res.send("Hello World");
})

app.get("/user", (req, res) => {
    throw new Error("User not found");
    res.status(200).send("User found");
})

app.use((err, req, res, next) => {
    res.send(404).send(err.message);
    errCount += 1;
})

app.listen(4000, () => {
    console.log("Server is running on port 4000");
})