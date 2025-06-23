require("dotenv").config(); // lets us use .env variables in our code
const express = require("express");
const app = express();
const ProductModel = require('./models/product')


app.use(express.json());

const PORT = process.env.PORT; //port from .env file

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

app.get('/products', async (req, res) => {
  const {category,sort} = req.query
  const filters = {}

  if(category){
    filters.category = category
  }

  if(sort){
    filters.sort = sort
  }

  const products = await ProductModel.listAllProducts({
    where: filters
  }
  )
  res.json(products)
})

app.get('/products/:id', async (req, res) => {
//grabbing by id 
})

app.post('/products', async (req, res) => {

  try {
    const newProduct = await ProductModel.createProduct(req.body)
    res.json(newProduct)
  } catch (error) {
    res.status(500).json({ error: 'Failed to create product.' })
  }
})


app.put('/products/:id', async (req, res) => {
    const {id } = req.params

  try{
  const updatedProduct = await ProductModel.updateProduct(id, req.body)

  res.json(updatedProduct)
}catch(error){
    res.status(500).json({ error: 'Failed to update product.' })

}
})

app.delete('/products/:id', async (req, res) => {
    const {id} = req.params
    try{
  const deletedProduct= await ProductModel.deleteProduct(id)
  res.json(deletedProduct)
    }catch{
            res.status(500).json({ error: 'Failed to delete product.' })

    }
})