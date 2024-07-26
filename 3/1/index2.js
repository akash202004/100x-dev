const express = require('express');
const zod = require('zod');

const app = express();

// const Schema = zod.array(zod.number());
const Schema = zod.object({
    email: zod.string(),
    password: zod.string(),
    country: zod.literal("IN").or(zod.literal("US")),
    kidneys: zod.array(zod.number())
})

app.use(express.json());

app.post("/akash", (req, res) => {
    const kidneys = req.body.kidneys;
    const response = Schema.safeParse(kidneys);
    res.send({ response });
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");

})