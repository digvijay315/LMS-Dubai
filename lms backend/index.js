const express = require('express');
const connect = require('./connect');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const { errorHandler } = require('./MiddleWare/errorMiddleware');
require('dotenv').config();

const app = express()
connect()
const attendanceRoutes = require('./Routes/attendanceRoutes');

// app.use(express.json());
app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ extended: true, limit: '5mb' }));

app.use('/images', express.static(path.join(__dirname, 'images')));
app.use(cors());
app.use('/', require('./Routes/admin'));
// app.use(bodyparsor.json());
app.use(bodyParser.json({ limit: '5mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '5mb' }));
app.use(morgan('dev'));

app.use(cors({
    // Replace with your frontend URL (exactly as it appears in the browser)
    origin: 'http://localhost:3000', 
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept']
}));

// Error handler middleware
app.use(errorHandler);

const catResponseRoutes = require('./Routes/admin');
app.use('/api', catResponseRoutes);

app.use('/api/questions', require('./Routes/admin'));

app.use('/api/lookup', require('./Routes/lookup'));

app.use('/api/attendance', attendanceRoutes);

app.get('/', (req, res) => {
    res.send('Hello World');
})

app.listen(5000,()=>
{
    console.log("server is running on 5000");
    
});
 // my index.js

