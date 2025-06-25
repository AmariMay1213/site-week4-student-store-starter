require("dotenv").config(); // lets us use .env variables in our code

const express = require("express");
const app = express();
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const morgan = require("morgan");
const studentStoreRoutes = require("./routes/studentStoreRoutes");
// /Users/amari.may/codepath/UNIT-4/site-week4-student-store-starter/student-store-api/routes/studentStoreRoutes.js

const orderRoutes = require("./routes/orderRoutes");
const orderItemRoutes = require("./routes/orderItemRoutes");



app.use(express.json());
app.use(morgan("dev"));
const cors = require("cors");
app.use(cors());



app.use("/products", studentStoreRoutes);
app.use("/orders", orderRoutes ); 
app.use("/orderItems", orderItemRoutes); 

const PORT = process.env.PORT; //port from .env file

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});





