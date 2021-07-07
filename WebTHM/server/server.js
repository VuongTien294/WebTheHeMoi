require('dotenv').config()

const cookieParser = require('cookie-parser')
const express = require('express')
const app = express()
const mongoose = require('mongoose')
bodyParser = require('body-parser');
const port = process.env.PORT || 5000;
const path = require('path');
var cors = require('cors')

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
})


// const allowlist = ['http://localhost:3000', 'http://localhost:5000'];

//     const corsOptionsDelegate = (req, callback) => {
//     let corsOptions;

//     // let isDomainAllowed = allowlist.indexOf(req.header('Origin')) !== -1;
//     let isDomainAllowed = allowlist.indexOf(req.header('Origin')) !== -1;
//     let isExtensionAllowed = req.path.endsWith('.jpg');

//     if (isDomainAllowed && isExtensionAllowed) {
//         // Enable CORS for this request
//         corsOptions = { origin: true }
//     } else {
//         // Disable CORS for this request
//         corsOptions = { origin: false }
//     }
//     callback(null, corsOptions)
// }

// app.use(cors(corsOptionsDelegate));

var corsOptions = {
  origin: "http://localhost:3000"
};

global.__basedir = __dirname;
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.on('open', () => console.log("connected to database"))
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

app.use(cors(corsOptions)) 
app.use(cookieParser())


var routes = require('./api/route/route');
routes(app)

app.use(function (req, res) {
  res.status(404).send({ url: req.originalUrl + ' not found' })
});

app.listen(port, () => console.log("server started in port "+port))