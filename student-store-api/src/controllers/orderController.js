const prisma = require("../models/order");

exports.getAll = async (req, res) => {
  const { sort} = req.query;
  const filters = {};
  const orderBy = [];

  if (sort) {
    const [field, direction] = sort.split("_");

    const validFields = ["created_at", "total_price"];
    const validDirections = ["asc", "desc"];

    if (validFields.includes(field) && validDirections.includes(direction)) {
      orderBy.push({ [field]: direction });
    } else {
      return res
        .status(400)
        .json({ error: "Invalid sort query. Use field_asc or field_desc." });
    }
  }

  try {
    const orders = await prisma.order.findMany({
      where: filters,
      orderBy: orderBy.length ? orderBy : undefined,
    });
    res.json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong." });
  }
};

exports.getByID = async (req, res) => {
  const order_id = Number(req.params.order_id);

  const order = await prisma.order.findUnique({ where: { order_id } });
  if (!order) {
    return res.status(404).json({ error: "Order not found!" });
  }
  res.json(order);
};

exports.getOrderWithItems = async (req, res) => {
  const order_id = Number(req.params.order_id);

  try {
    const order = await prisma.order.findUnique({
      where: { order_id },
      include: {
        //include all the orderItems for this order 
        orderItems: {
          include: {
            product: true
            // include product info for each item 
          }
        }
      }
    });

    if (!order) {
      return res.status(404).json({ error: "Order not found!" });
    }

    res.json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong." });
  }
};

exports.getOrderTotalPrice = async (req,res) => {
  //calculate and return the total price of an order 
    // const order_id = Number(req.params.order_id);

    let total_price = 0; 

    //fetch orderItems list, acces the quantity and price multiply them and add them together return total_price and display it

    const order_id = req.params.order_id

    try{
      const orderList = await prisma.orderItem.findMany({
        where: {
          order_id: Number(order_id), 
          //we have just fetched all the items for the given order 
        }
      })
      orderList.forEach((item) => {
        total_price += item.price * item.quantity;
          });

          res.json({total_price})

    }catch(err){
      console.error(err);
    res.status(500).json({ error: "Something went wrong." });
    }

}


exports.create = async (req, res) => {
  const { customer_id, total_price, status } = req.body;
  
  const newOrder = await prisma.order.create({
    data: { customer_id, total_price, status },
  });

  res.status(201).json(newOrder);
};

exports.addItemToOrder = async (req,res) => {
  //we are adding items to a specific order updates the order and order items models to handle adding items to an order
  const order_id = Number(req.params.order_id); 
  const { product_id, quantity, price } = req.body;

  const newOrderItem = await prisma.orderItem.create({
    data: {order_id,product_id, quantity, price},
  }); 

  res.status(201).json(newOrderItem)

  
}

exports.update = async (req, res) => {
  const order_id = Number(req.params.order_id);
  const { customer_id, total_price, status } = req.body;
 




  const updateOrder = await prisma.order.update({
    where: { order_id },
    data: {
     customer_id, 
     total_price,
     status 
    },
  });

  res.json(updateOrder);
};

exports.remove = async (req, res) => {
  const order_id = Number(req.params.order_id);
  await prisma.order.delete({ where: { order_id } });
  res.status(204).end();
};


