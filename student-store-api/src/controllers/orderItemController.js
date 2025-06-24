const prisma = require("../models/orderItem");

exports.getAll = async (req, res) => {

     try {
    const orders = await prisma.orderItem.findMany();
    res.json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong." });
  }
};

exports.getByID = async (req, res) => {
  const order_item_id = Number(req.params.order_item_id);

  const orderItem = await prisma.orderItem.findUnique({ where: { order_item_id } });
  if (!orderItem) {
    return res.status(404).json({ error: "Order not found!" });
  }
  res.json(orderItem);
};

exports.create = async (req, res) => {
    const { order_id, product_id, quantity, price } = req.body;


  if (
  order_id === undefined ||
  product_id === undefined ||
  quantity === undefined ||
  price === undefined
) {
  return res.status(400).json({ error: "All fields are required" });
}


  if (typeof price !== "number") {
      return res.status(400).json({ error: "Price must be a number" });
  }

  const newOrderItem = await prisma.orderItem.create({
    data: { order_id, product_id, quantity, price },
  });

  res.status(201).json(newOrderItem);
};

exports.update = async (req, res) => {
  const order_item_id = Number(req.params.order_item_id);
  const { order_id, product_id, quantity, price } = req.body;



  if (typeof price !== "number") {
    throw new Error("price must be a number");
  }
 
  const updateOrderItem = await prisma.orderItem.update({
    where: { order_item_id },
    data: {
     order_id,
     product_id,
     quantity,
     price
    },
  });

  res.json(updateOrderItem);
};

exports.remove = async (req, res) => {
  const order_item_id = Number(req.params.order_item_id);
  await prisma.orderItem.delete({ where: { order_item_id } });
  res.status(204).end();
};
