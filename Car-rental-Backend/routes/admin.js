const express = require("express");
const router = express.Router();
const AdminController = require("../controller/admin");

router.post("/login", AdminController.AdminLogin);

exports.router = router;
