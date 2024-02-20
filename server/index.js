const express= require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes')
const messagesRoute = require('./routes/messagesRoute')
const path = require('path');

dotenv.config();

const app = express();
const bodyParser = require('body-parser');

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api/auth',userRoutes)
app.use('/api/message',messagesRoute)

mongoose.connect(process.env.MONGO_URL,
    console.log("mongoose is connected"))
.then(
        app.listen(9000,()=>{
            console.log('server is starting at port 9000')
        })
    ).catch((error)=>{
        console.log(error);
    })
