const express = require('express');
const cors = require('cors');
const port = 8080;

const app = express();
app.use(express.json());
app.use(cors()); // Enable CORS for all routes

const db = require('./config/db');

app.use('/', require('./routes/UserRoutes'));
app.use('/', require('./routes/categoryRoutes'));

app.listen(port, (error) => {   
    if (error) {
        console.log(error);
        return false;
    }
    console.log(`Server Start On ${port} Port`);
});
