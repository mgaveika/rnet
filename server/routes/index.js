const express = require("express")

const auth = require("./auth")
const user = require("./user")
const product = require("./product")
const favorite = require("./favorite")

const authorized = require("../middleware/Authorized")

const router = express.Router()

router
    .use("/auth", auth)
    .use("/user", authorized, user)
    .use("/product", authorized, product)
    .use("/favorite", authorized, favorite)

module.exports = router