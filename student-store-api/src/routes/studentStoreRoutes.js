const express = require("express")
const router = express.Router();
const controller = require("../controllers/storeController")



// setup all routes


router.get("/", controller.getAll);
router.get("/:id", controller.getByID);
router.post("/", controller.create);
router.put("/:id", controller.update);
router.delete("/:id", controller.remove);

module.exports = router;