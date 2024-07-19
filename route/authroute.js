const { registerAdmin, loginAdmin } = require("../controllers/authcontroller")

const router = require("express").Router()


router
    .post("/register-admin", registerAdmin)
    .post("/login", loginAdmin)

module.exports = router