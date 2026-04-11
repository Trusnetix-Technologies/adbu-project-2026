const express = require("express"); // npm i express
const mongoose = require("mongoose"); // npm install mongoose

require("dotenv").config(); // Load environment variables. Make sure .env is in .gitignore 

const port = 5001;

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));

mongoose.connect(process.env.MONGO_URI, {}).then(() => {
    console.log("Connected to MongoDB");
}).catch((err) => {
    console.log("Error connecting to MongoDB: ", err);
});

// Models
require("./models/Movie");

// Routes
require("./routes/movieRoutes")(app); 

app.listen(port, () => {
    console.log(`Server is running on Port ${port}`);
});

// SQL
//     MySQL, MariaDB
//         Tables | Rows

// NoSQL
//     MongoDB
//         Collections | Documents