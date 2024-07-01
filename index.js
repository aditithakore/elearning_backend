const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const route= require('./routes/user');
const {connectToMongoose} = require('./connection')
const url = process.env.MONGO_URI;
const port =process.env.PORT;
// const port = 3001;
console.log(`Your port is ${process.env.PORT}`);


const app = express();
app.use(express.json());

connectToMongoose(url).then(() => console.log("db connected"));
app.use('/user', route);
app.listen(port,() => console.log(`listening on port:${port}`));