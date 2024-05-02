require('dotenv').config();
const cloudinary = require('cloudinary');

const express = require('express');
const app = express();
const cors = require('cors');
const connection = require('./database');
const userRoutes = require('./routes/userRoute');
const dotenv = require('dotenv');
const product = require('./routes/productRoute');
const rent = require('./routes/rentRoute');
const order = require('./routes/orderRoute');
const category = require('./routes/categoryRoute');
const errorMiddleware = require('./middleware/error');
const cookieParser = require('cookie-parser');
//const bodyParser = require('body-parser');
// database connection
connection();

dotenv.config({ path: 'Backend/.env' });
//coludinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.APIKEY,
  api_secret: process.env.APISECRETKEY,
});

// middlewares
app.use(express.json());
app.use(cors());
app.use(cookieParser());
//app.use(bodyParser.urlencoded({ extended: true }));
//app.use(fileUpload());

// middleware for error
app.use(errorMiddleware);

//routes
app.use('/api/users', userRoutes);

app.use('/api/v1', product);
app.use('/api/v1', order);
app.use('/api/v1', rent);
app.use('/api/v1', category);

const port = process.env.PORT || 8080;
const server = app.listen(port, () =>
  console.log(`Listening on port ${port}...`)
);

// unhandled promise rejection
process.on('unhandledRejection', (err) => {
  console.log(`Error:${err.message}`);
  console.log(`shutting down the server due to unhandled Promise Rejection`);
  server.close(() => {
    process.exit(1);
  });
});
