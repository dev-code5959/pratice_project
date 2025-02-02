//basic

let express = require('express');
let app =  new express();
const router = require('./src/routes/api');
const bodyParser = require('body-parser');

//security middleware
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const expressMongoSanitize = require('express-mongo-sanitize');
const xxClean = require('xss-clean');
const hpp = require('hpp');
const cors = require('cors');


//database lib import
const mongoose = require('mongoose');


//security middleware implement
app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(expressMongoSanitize())
app.use(xxClean())
app.use(hpp())
//body parser implement
app.use(bodyParser.json());


//request rate limit
const limiter =rateLimit({windowMs:15*60*1000,max:3000})
app.use(limiter)



//mongodb database connection
let url = "mongodb+srv://devasif:devasif1234@cluster0.pbqyg.mongodb.net/Todo?retryWrites=true&w=majority&appName=Cluster0";
let options = {autoIndex:true};

mongoose.connect(url,options)
    .then(()=>{
        console.log("MongoDB Connected");
    }).catch((err)=>{
        console.log(err);
})

//routing implement

app.use('/api/v1',router);


//undefined route implement
app.use("*",(req,res)=>{
    res.status(404).json({success:"Fail",message:"Not Found"});
})



module.exports = app;