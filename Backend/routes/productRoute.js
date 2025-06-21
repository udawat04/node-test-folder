const express = require("express")
const { createproduct, getProduct } = require("../controller/productController")
const auth = require("../middleware/auth");
const router = express()

router.post("/create",auth,createproduct)
router.get("/",getProduct)

module.exports = router