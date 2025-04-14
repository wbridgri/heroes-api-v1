//Step 1
const express = require('express');

const server = express();

const helmet = require('helmet');

const cors = require('cors');
//router here
const router = require('./app/routes/router')

const PORT = process.env.PORT || 3000;

//Handle Security
//Step 3
server.use(helmet.contentSecurityPolicy({
    useDefaults: true,
    crossOriginResourcePolicy: false,
    crossOriginEmbedderPolicy: false,
    directives: {
        "img-src": ["'self'", "https: data:"],
        "scriptSrc": ["'self'", "cdn.jsdelivr.net"]
    }
}));

server.use(cors());

server.use(express.json());
server.use(express.urlencoded( { extended: true }));
//all the server.use methods can be chained together

//Step 4
//build root route
//localhost:3000/api
server.get('/api', (req, res) => {
    res.json({
        'All Heroes': `http://localhost:${PORT}/api/hero`
    })
})
//Step 5
//add router and set view engine
server.use('/', router);
server.set('view engine', 'ejs');



//Step 2
server.listen(PORT, ()=> console.log(`Port ${PORT} is RUNNING!!!`));