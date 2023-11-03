const express = require("express");
const errorHandler = require("./middleware/errorHandler");
const connectDb = require("./config/dbConnection");
const app = express();
const dotenv = require("dotenv").config();

connectDb();
app.use(express.json());
//using middleware to add routes
app.use('/api/contacts', require('./routes/contactRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use(errorHandler);
const port = process.env.PORT || 5000
app.listen(port, ()=>{
    console.log(`Server running on port:${port} `);
})