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

router.post('/courses/:courseId', UserMiddleware, async (req, res) => {
    const courseId = req.params.courseId;
    const username = req.headers.username;
    await User.updateOne({
        username: username
    }, {
        $push: {
            purchasedCourse: courseId
        }
    })
    res.json({ message: 'Course Purchases!!' });
});

router.get('/courses', async (req, res) => {
    const allCourses = await Course.find({})
    res.json({ 'Courses': allCourses });
});

router.get('/purchasedCourse', UserMiddleware, async (req, res) => {
    const user = await User.findOne({
        username: req.headers.username
    })
    console.log(user.purchasedCourse);
    const course = await Course.find({
        _id: {
            $in: user.purchasedCourse
        }
    })
    res.json({ 'Courses': course });
});


module.exports = router;
