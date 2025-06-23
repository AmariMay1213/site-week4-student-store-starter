const prisma = require("../models/product")

//add list by id 


exports.getAll = async (req,res) =>{
    const {category} = req.query
  const filters = {}

  if(category){
    filters.category = category
  }

//   if(sort){
//     filters.sort = sort
//   }

  const products = await prisma.product.findMany({
    where: filters
  }
  )
  res.json(products)
}

exports.getByID = async (req,res) =>{
    const id = Number(req.params.id)

    const product = await prisma.product.findUnique({where: {id}});
    if(!product){
        return res.status(404).json({error: "Product not found!" });
        
    }
    res.json(product)
    
}


exports.create = async (req,res) => {
    const { name, description, price, image_url, category } = req.body 
    if (!name || !description|| !price || !image_url || !category) {
    throw new Error('All fields are required')

  }

  if (typeof price !== 'number') {
      throw new Error('price must be a number')
  }


  const newProduct = await prisma.product.create({
    data: {name, description, price, image_url, category}

  });

  res.status(201).json(newProduct);


};


exports.update = async (req,res) => {
    const id = Number(req.params.id)
    const { name, description, price, image_url, category } = req.body 

     if (!name || !description|| !price || !image_url || !category) {
    throw new Error('All fields are required')
  }

  if (typeof price !== 'number') {
        throw new Error('price must be a number')
  }

  const updateProduct = await prisma.product.update({
    where: { id: parseInt(id) },
    data: {
         name, 
         description,
         price, 
         image_url, 
         category
      
    }

  });

  res.json(updateProduct)



}

exports.remove = async (req,res) => {

    const id = Number(req.params.id)
    await prisma.product.delete({ where: { id: parseInt(id) } })
    res.status(204).end()

}

