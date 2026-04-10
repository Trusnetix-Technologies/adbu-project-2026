const express = require("express"); // npm i express

const port = 5001;

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Routes
require("./routes/movieRoutes")(app); 

app.listen(port, () => {
    console.log(`Server is running on Port ${port}`);
});