//packages imports
const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDoc = require('swagger-jsdoc');

//security packages
const helmet = require('helmet');
const xss = require('xss-clean');
const mongoSanitize = require('express-mongo-sanitize');
const limiter = require('express-rate-limit');
const app = express();
require('dotenv').config();
const color = require('color');
const cors = require('cors');
const morgan = require('morgan')
const errors = require('express-async-errors');

//file imports
const db = require('./config/db');
const JWT_SECRET = process.env.JWT_SECRET;

//Routes imports
const testRoute = require('./routes/testRoute')
const authRoutes = require('./routes/authRoutes');
const errorMiddelware = require('./middelwares/errorMiddelware');
const userRoutes = require('./routes/userRoutes');
const jobsRoutes = require('./routes/jobsRoutes')
const authMiddleware = require('./middelwares/authMiddleware');

//mongodb connection
db();

//swagger api config
//swagger api option
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Job Portal Application',
            description: 'Node Express js Job Portal Application'
        },
        servers: [{
            url: 'http://localhost:3000'
        }]
    },
    apis: ["./routes/*.js"]
};
const swaggerSpec = swaggerDoc(options)
    //middlewares
app.use(helmet());
app.use((xss()));
app.use(mongoSanitize());
app.use(limiter());
app.use(express.json());
app.use(cors());
app.use(morgan());


//Routes
app.use('/test', testRoute);
app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/job', jobsRoutes);

//home route
app.use("/api-doc", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

//Validation at middelware
app.use(errorMiddelware);

//PORT
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running in ${process.env.DEV_MODE} on ${PORT}`);
})