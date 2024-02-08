const mongoose = require('mongoose');
require('dotenv').config()

const dbConnect = async function(){
    try {
        await mongoose.connect(process.env.DB_URL);
        console.log('connected to database successfully')
    }
    catch(err){
        console.log("unable to connect to database");
        console.log(err);
    }
}

module.exports = dbConnect;
