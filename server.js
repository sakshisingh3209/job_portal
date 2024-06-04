//packages imports
const express = require('express');
const app = express();
require('dotenv').config();
const color = require('color');
const cors = require('cors');
const morgan = require('morgan')
const errors = require('express-async-errors');

//file imports
const db = require('./config/db');


//Routes imports
const testRoute = require('./routes/testRoute')
const authRoutes = require('./routes/authRoutes');
const errorMiddelware = require('./middelwares/errorMiddelware');
const userRoutes = require('./routes/userRoutes');
const jobsRoutes = require('./routes/jobsRoutes')
    // const authMiddleware = require('./middelwares/authMiddleware');
db();
app.use(express.json());
app.use(cors());
app.use(morgan());

//Routes
app.use('/test', testRoute);
app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/job', jobsRoutes);


//Validation at middelware
app.use(errorMiddelware);

//PORT
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running in ${process.env.DEV_MODE} on ${PORT}`);
})