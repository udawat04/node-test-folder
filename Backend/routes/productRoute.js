const express = require("express")
const { createproduct, getProduct } = require("../controller/productController")
const auth = require("../middleware/auth");
const router = express()

router.post("/create",auth,createproduct)
router.get("/",auth,getProduct)

module.exports = router