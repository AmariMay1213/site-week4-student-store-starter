// node.js - backend connection with Prisma
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
module.exports = prisma;
//importing prisma helps you talk to the database/sql 