const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const port = process.env.PORT || 3002;

app.use(bodyParser.json());
app.get("/", (req, res) => {
    console.log(req.body);
    res.send("Akash Laha")
})

app.post("/name", (req, res) => {
    const message = req.query.message;
    console.log(message);
})

app.listen(port, () => {
    console.log(`App is running on port ${port}`);
})