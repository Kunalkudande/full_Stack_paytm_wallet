const express = require("express");
const rootRouter = require("./routes/index")
const cors = require('cors');
const JWT_SECRET = require('./config')
require('dotenv').config();
const port = process.env.PORT
const dbConnect = require('./database/dbconnect')
dbConnect();

const app = express();
app.use(cors({
  origin: 'https://paytm-wallet-front.vercel.app'
}));
app.use(express.json())

app.use('/api/v1',rootRouter);

app.listen(port,function(){
    console.log(`server is running on port ${port}`)
})
