const express = require("express")
const { createUser, getall, login, reset } = require("../controller/userController")
const auth = require("../middleware/auth")


const router = express()

router.post("/create",createUser)
router.get("/getall",auth,getall)

router.post("/login",login)

router.put("/reset",reset)

module.exports = router