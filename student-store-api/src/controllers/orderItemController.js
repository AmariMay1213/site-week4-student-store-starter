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
  const id = Number(req.params.id);

  const orderItem = await prisma.orderItem.findUnique({ where: { id } });
  if (!orderItem) {
    return res.status(404).json({ error: "Order not found!" });
  }
  res.json(orderItem);
};

exports.create = async (req, res) => {
    const { orderId, productId, quantity, price } = req.body;
  if (!orderId || !productId || !quantity|| !price ) {
    throw new Error("All fields are required");
  }

  if (typeof price !== "number") {
    throw new Error("price must be a number");
  }

  const newOrderItem = await prisma.orderItem.create({
    data: { orderId, productId, quantity, price },
  });

  res.status(201).json(newOrderItem);
};

exports.update = async (req, res) => {
  const id = Number(req.params.id);
  const { orderId, productId, quantity, price } = req.body;

  if (!orderId || !productId || !quantity|| !price ) {
    throw new Error("All fields are required");
  }

  if (typeof price !== "number") {
    throw new Error("price must be a number");
  }
 
  const updateOrderItem = await prisma.orderItem.update({
    where: { id: parseInt(id) },
    data: {
     orderId,
     productId,
     quantity,
     price
    },
  });

  res.json(updateOrderItem);
};

exports.remove = async (req, res) => {
  const id = Number(req.params.id);
  await prisma.orderItem.delete({ where: { id: parseInt(id) } });
  res.status(204).end();
};
