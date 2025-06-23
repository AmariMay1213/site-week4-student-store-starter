const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

//importing prisma helps you talk to the database/sql 


async function listAllProducts() {
  return await prisma.product.findMany()
  //grabbing all the products
}

//add list by id 

async function createProduct(productData){

  const { name, description, price, image_url, category } = productData
  //productData is an input thatll ask the user hey what data do you want to input about this product? 


  if (!name || !description|| !price || !image_url || !category) {
    throw new Error('All fields are required')

  }

  if (typeof price !== 'number') {
      throw new Error('price must be a number')
  }

  const newProduct = await prisma.product.create({
    data: {name, description, price, image_url, category}

  })

  return newProduct
}

async function updateProduct(id, productData){
  
    const { name, description, price, image_url, category } = productData

     if (!name || !description|| !price || !image_url || !category) {
    throw new Error('All fields are required')
  }

  if (typeof price !== 'number') {
        throw new Error('price must be a number')
  }

  const updatedProduct = await prisma.product.update({
     where: { id: parseInt(id) },
    data: {
         name, 
         description,
         price, 
         image_url, 
         category
      
    }
  })
  return updatedProduct

}

async function deleteProduct(id){
  const deletedProduct = await prisma.product.delete({
        where: { id: parseInt(id) }


  })
  return deletedProduct



}

module.exports = {
  listAllProducts,
  createProduct,
  updateProduct,
  deleteProduct

  //in order to use in server.js we must export this grabbed data 
}
