const express = require("express")
const router = express.Router();
const controller = require("../controllers/orderController")



// setup all routes


router.get("/", controller.getAll);
router.get("/:order_id", controller.getByID);
router.get("/:order_id/full", controller.getOrderWithItems); 
router.get("/:order_id/total", controller.getOrderTotalPrice); 
//displau customer # and then show what they ordered and each orders product details
router.post("/", controller.create);
router.post("/:order_id/items",controller.addItemToOrder);
router.put("/:order_id", controller.update);
router.delete("/:order_id", controller.remove);

module.exports = router;