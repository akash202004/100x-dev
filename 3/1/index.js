const express = require('express');

const app = express();

function middlewares(req, res, next) {
    const username = req.headers.username;
    const password = req.headers.password;
    const kidneyID = req.query.kidneyID;
    if (username != "akash" && password != "12345") {
        res.status(401).send("Unauthorized");
        return;
    }
    if (kidneyID != "1") {
        res.status(404).send("Kidney not found");
        return;
    }
    next();
}

app.get("/akash", middlewares, (req, res) => {
    res.send("Kidney 1 is functioning properly");
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");

})