const express = require('express');
const jwt = require('jsonwebtoken');
const z = require('zod');

const app = express();
const secret = "2122";
const emailSchema = z.string().email();
const passwordSchema = z.string().min(6);

function emailPassverify(email, password) {
    const emailverify = emailSchema.safeParse(email);
    const passwordverify = passwordSchema.safeParse(password);
    if (!emailverify.success || !passwordverify.success) {
        return null;
    }
    const token = jwt.sign({ emailverify }, secret);
    return token;
}

function jwtDecode(token) {
    const ans = jwt.decode(token);
    if (ans) {
        return true;
    }
}

function jwtVerify(token) {
    const ans = jwt.verify(token, secret);
    if (ans) {
        return true;
    }
}

const ans = emailPassverify("a@gmail.com", "111111111");
const ans2 = jwtDecode("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbHZlcmlmeSI6eyJzdWNjZXNzIjp0cnVlLCJkYXRhIjoiYUBnbWFpbC5jb20ifSwiaWF0IjoxNzIyNjEzNDc3fQ.1V2prAS0B9CGVC04ru8dQfNKh4VYbrHZs-ii0Xe6zVs");
const ans3 = jwtVerify("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbHZlcmlmeSI6eyJzdWNjZXNzIjp0cnVlLCJkYXRhIjoiYUBnbWFpbC5jb20ifSwiaWF0IjoxNzIyNjEzNDc3fQ.1V2prAS0B9CGVC04ru8dQfNKh4VYbrHZs-ii0Xe6zVs")
// console.log(ans);
// console.log(ans2);
console.log(ans3);

// app.get("/", (req, res) => {
//     const email = req.headers.email;
//     const password = req.headers.password;
//     const token = emailPassverify(email, password);
//     res.send("token = " + token);
// });

// app.listen(4000, () => {
//     console.log("Server is running on port 3000");

// })