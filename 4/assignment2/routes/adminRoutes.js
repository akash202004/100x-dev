const { Router } = require('express');
const adminMiddleware = require('../middleware/adminMiddleware');
const { Admin, Course } = require('../db');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');
const router = Router();


router.post('/signup', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    await Admin.create({
        username: username,
        password: password
    })
    res.json({ message: 'Admin created' });
});

router.post('/signin', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const validateUser = await Admin.findOne({ username: username, password: password });
    if (!validateUser) {
        res.json({ message: 'Invalid credentials' });
        return
    }

    const token = jwt.sign({ username }, JWT_SECRET);
    res.json({ token });
});

router.post('/courses', adminMiddleware, async (req, res) => {
    const title = req.body.title;
    const description = req.body.description;
    const imageLink = req.body.imageLink;
    const price = req.body.price;

    const courseResult = await Course.create({
        title: title,
        description: description,
        imageLink: imageLink,
        price: price
    })
    res.json({ message: 'Course created', courseId: courseResult._id });

});

router.get('/courses', adminMiddleware, (req, res) => {
    Course.find({}).then((courses) => {
        res.json(courses);
    }).catch((err) => {
        res.json({ message: 'Error occurred' })
    })
});

module.exports = router;