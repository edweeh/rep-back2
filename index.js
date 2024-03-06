const express = require("express");
const cors = require("cors");
const signupRoute = require('./routes/signupRoute');
const petRoute = require('./routes/petroute');
const loginRoute = require('./routes/loginRoute');
const categoryRoute = require('./routes/categoryRoute');
const cartroute = require('./routes/cartroute');
const db = require("./Connection/Database");

const app = express(); // Removed "new" before express

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.get('/', (request, response) => {
    response.send("hi database");
});

app.use("/signup", signupRoute);

app.use("/adminlogin", loginRoute);

app.use("/pet", petRoute);

app.use("/category", categoryRoute);

app.use("/cart", cartroute);


app.listen(4500, (request, response) => { // Changed from (3000, (request, response) => ...) to (3000, () => ...)
    console.log("Server is running on port 4000");
});
