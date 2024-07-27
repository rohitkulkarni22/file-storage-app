const mongoose = require("mongoose");

require("dotenv").config


const uri = "mongodb+srv://rohit22codes:LX3MZYYQDAt4sTLn@cluster0.ezdcexh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"; 
const connection = async () => {
    try {
        await mongoose.connect(uri);
        console.log("Connected to MongoDB")
    } catch (error) {
        console.error(error);
    }
}

module.exports = connection; 