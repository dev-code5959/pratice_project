const app = require('./app.js');
const dotenv = require('dotenv');
dotenv.config({path: "./config.env"});

const port = process.env.PORT | 5050;



app.listen(port,()=>{
    console.log(`Server started on port ${port}`);
});



