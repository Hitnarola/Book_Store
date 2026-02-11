const express = require("express");
const router = express.Router();
const author_table = require("../models/author.model");
const booktable = require("../models/book.model");
const db = require("../db");
const { eq } = require("drizzle-orm");

const controller = require("../controllers/book.controller");

router.get("/", async (req, res) => {
  const authors = await db.select().from(author_table);
  return res.json(authors);
});

router.get("/:id", async (req, res) => {
  const [authors] = await db
    .select()
    .from(author_table)
    .where(eq(author_table.id, req.params.id));

  if (!authors) {
    return res
      .status(404)
      .json({ error: `author with id ${req.params.id} does not exists!` });
  }
  return res.json(authors);
});

router.post("/", async (req, res) => {
  const { firstname, lastname, email } = req.body;
  const [result] = await db
    .insert(author_table)
    .values({ firstname, lastname, email })
    .returning({ id: author_table.id });
  return res.json({ message: `author has been created`, id: result.id });
});

router.get("/:id/books", async (req, res) => {
  const books = await db
    .select()
    .from(booktable)
    .where(eq(booktable.author_id, req.params.id));
  return res.json(books);
});

router.delete("/:id", controller.deleteBookById);

module.exports = router; // default exports
