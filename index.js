const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const route= require('./routes/user');
const bodypartroute= require('./routes/bodypart');
const colorroute= require('./routes/colors');
const shaperoute= require('./routes/shapes');
const alphabetroute= require('./routes/alphabets');
const numberroute= require('./routes/number');
const habitroute= require('./routes/habits');

const {connectToMongoose} = require('./connection')
const url = process.env.MONGO_URI;
const port =process.env.PORT;
// const port = 3001;
console.log(`Your port is ${process.env.PORT}`);


const app = express();
app.use(express.json());

connectToMongoose(url).then(() => console.log("db connected"));
app.use('/user', route);
app.use('/bodypart', bodypartroute);
app.use('/color', colorroute);
app.use('/shape', shaperoute);
app.use('/alphabet', alphabetroute);
app.use('/number', numberroute);
app.use('/habit', habitroute);
app.listen(port,() => console.log(`listening on port:${port}`));
