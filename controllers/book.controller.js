
const booktable = require("../models/book.model");
const authortable = require("../models/author.model");
const db = require("../db");
const { eq, ilike } = require("drizzle-orm");
const { sql } = require("drizzle-orm");

// ilike means ilike is a Drizzle ORM helper for PostgreSQL that does a case-insensitive LIKE match. It translates to SQL ILIKE, so "Harry" matches "harry" too.

//model is the database
exports.getAllBooks = async function (req, res) {
  const search = req.query.search;

  // console.log(search);

  if (search) {
    const books = await db
      .select()
      .from(booktable)
      .where(
        sql`to_tsvector('english', ${booktable.title}) @@ to_tsquery('english', ${search})`,
      );

    //.where(ilike(booktable.title, `%${search}%`));

    //if there is the the so many book then `%${search}%` this is slow to search so that we use the indexing
    return res.json(books);
  }
  const books = await db.select().from(booktable);
  return res.json(books);
};

exports.getBookById = async function (req, res) {
  const id = req.params.id; // from the parameter  get me the id

  const [book] = await db
    .select()
    .from(booktable)
    .where((table) => eq(table.id, id))
    .leftJoin(authortable,eq(booktable.author_id,authortable.id))
    .limit(1); // this will check type of variable also so in the url you type id as string then you have to parseint the id or you remove one equal to sign

  if (!book)
    return res.status(404).json({ error: `book with ${id} doesnot exists!` });
  return res.json(book);
};

exports.createBook = async function (req, res) {
  const { title, description, author_id } = req.body;

  if (!title || title === "")
    return res.status(400).json({ error: "title is required" });

  const [result] = await db
    .insert(booktable)
    .values({ title, description, author_id })
    .returning({ id: booktable.id });

  // here we do the Array destructuring means the returning statement will return the array of object but we write the [result] then it will take first value of array object , if we have two value in array
  //[result]=[{ id: 5 }]
  //const [row] = result
  //row = { id: 5 } // row is object

  //If you write only result, it will be the whole array of rows. So you’d access the id like result[0].id, or return the full array.

  return res
    .status(201)
    .json({ message: "Book created successful", id: result.id });
};

exports.deleteBookById = async function (req, res) {
  const id = req.params.id;

  await db.delete(booktable).where(eq(booktable.id, id));

  return res.status(200).json({ message: "Book deleted" });
};

// controller is very critical and it is very secure file
// controller is something do from the DB or get from the DB
