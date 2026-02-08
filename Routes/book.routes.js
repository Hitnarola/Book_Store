const express = require("express");
const router = express.Router();
const controller = require("../controllers/book.controller");
router.get("/", controller.getAllBooks);

router.get("/:id", controller.getBookById);

// json is the key value pair
// if we want response some custom header then its prefferd to start with x
// to make the book id dymamic we write the colon /books/:id --> /books/anything
// in the url anything write start with :(colon) which called dynamic parameter

router.post("/", controller.createBook);

router.delete("/:id", controller.deleteBookById);

module.exports = router; // default exports
