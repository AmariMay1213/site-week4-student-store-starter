require("dotenv").config(); // lets us use .env variables in our code

const express = require("express");
const app = express();
const ProductModel = require('./models/product')
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const morgan = require("morgan");
const studentStoreRoutes = require("./routes/studentStoreRoutes");




app.use(express.json());
app.use(morgan("dev"));


const PORT = process.env.PORT; //port from .env file

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

app.use("/products", pokemonRoutes);



