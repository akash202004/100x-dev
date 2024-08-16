const express = require('express');
const bodyParser = require('body-parser');
const adminRouter = require('./routes/adminRoutes.js');
const userRouter = require('./routes/userRoutes.js');

const app = express();

// middleware for parsing request bodies
app.use(bodyParser.json());

// routes
app.use('/user', userRouter)
app.use('/admin', adminRouter)

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});