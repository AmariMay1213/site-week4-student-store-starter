const express = require("express")
const router = express.Router();
const controller = require("../controllers/orderItemController")



// setup all routes


router.get("/", controller.getAll);
router.get("/:order_item_id", controller.getByID);
router.post("/", controller.create);
router.put("/:order_item_id", controller.update);
router.delete("/:order_item_id", controller.remove);

module.exports = router;