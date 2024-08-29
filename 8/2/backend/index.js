const express = require('express');
const dbConnect = require('./config/db');
const dotenv = require('dotenv');
const userRoute = require('./routes/userRoute');
const cors = require("cors");

// dotenv config
dotenv.config();

// app && port
const app = express();
const PORT = process.env.PORT || 3300;

// db connection
dbConnect();

// middleware
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static('public'));
app.use(express.json());

// routes
app.get('/', (req, res) => {
    res.send('Hello World');
})
app.use('/api/users', userRoute);

// server listening
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})