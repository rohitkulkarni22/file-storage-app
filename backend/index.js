const express = require("express");
const cookieParser = require("cookie-parser");
const userRoute = require("./routes/userRoute");
const fileRoute = require('./routes/fileRoute')
const cors = require("cors");

const port = 8080;

const connection = require("./db.config");

const app = express();
const corsOption = {
    origin: "http://localhost:3000", 
};

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); 
app.use(cookieParser());
app.use(cors(corsOption));

// Routes
app.use("/user", userRoute);
app.use('/files', fileRoute);



app.get('/', (req, res) => {
    res.send("Hi from server");
});

// Database connection
connection();

// Start server
app.listen(port, () => {
    console.log(`App is running on port ${port}`);
});
