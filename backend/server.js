import express from "express";
import 'dotenv/config';                 

const app = express();

app.get('/', (req, res) => {
    res.json({msg: "Hello Big-Oh group members!"})
});

app.listen(process.env.PORT, () => {
    console.log('I\'m listening to '+ process.env.PORT)
});