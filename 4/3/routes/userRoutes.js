const { Router } = require('express');
const { User, Course } = require('../db');
const UserMiddleware = require('../middleware/userMiddleware');
const router = Router();

router.post('/signup', async (req, res) => {
    const username = req.body.username;
    const fullname = req.body.fullname;
    const password = req.body.password;

    await User.create({
        fullname: fullname,
        username: username,
        password: password
    })
    res.json({ message: 'User created' });
});

router.post('/courses/:courseId', UserMiddleware, (req, res) => {
    res.send('Adding course...');
});

router.get('/courses', async (req, res) => {
    const allCourses = await Course.find({})
    res.json({ 'Courses': allCourses });
});

router.get('/purchasedCourse', UserMiddleware, (req, res) => {
    res.send('Adding course...');
});


module.exports = router;
