const express = require('express');

const app = express();

let numberofRequests = {};
setInterval(() => {
    numberofRequests = {}
}, 1000)

app.use(function (req, res, next) {
    const userId = req.headers['user-id'];
    if (numberofRequests[userId]) {
        numberofRequests[userId] += 1;
        if (numberofRequests[userId] > 5) {
            res.status(404).send("You have exceeded the maximum number of requests");
        } else {
            next();
        }
    } else {
        numberofRequests[userId] = 1;
        next();
    }
})

app.get("/", (req, res) => {
    res.send("Hello World");
})

app.listen(5000, () => {
    console.log("Server is running on port 5000");
})