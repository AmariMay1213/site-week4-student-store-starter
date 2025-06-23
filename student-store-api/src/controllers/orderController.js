const prisma = require("../models/order");

exports.getAll = async (req, res) => {
  const { sort} = req.query;
  const filters = {};
  const orderBy = [];

  if (sort) {
    const [field, direction] = sort.split("_");

    const validFields = ["createdAt", "total", "customer"];
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
  const id = Number(req.params.id);

  const order = await prisma.order.findUnique({ where: { id } });
  if (!order) {
    return res.status(404).json({ error: "Order not found!" });
  }
  res.json(order);
};

exports.create = async (req, res) => {
  const { customer, total, status } = req.body;
  if (!customer|| !total|| !status ) {
    throw new Error("All fields are required");
  }

  if (typeof total !== "number") {
    throw new Error("price must be a number");
  }

  const newOrder = await prisma.order.create({
    data: { customer, total, status },
  });

  res.status(201).json(newOrder);
};

exports.update = async (req, res) => {
  const id = Number(req.params.id);
  const { customer, total, status } = req.body;
  if (!customer|| !total|| !status ) {
    throw new Error("All fields are required");
  }

  if (typeof total !== "number") {
    throw new Error("price must be a number");
  }



  const updateOrder = await prisma.order.update({
    where: { id: parseInt(id) },
    data: {
     customer, 
     total,
     status 
    },
  });

  res.json(updateOrder);
};

exports.remove = async (req, res) => {
  const id = Number(req.params.id);
  await prisma.order.delete({ where: { id: parseInt(id) } });
  res.status(204).end();
};
