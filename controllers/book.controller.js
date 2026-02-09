//views is the frontend which the user can see

//controllers are taking the request from the frontend(views) and interacting with out models means its act as the middlelayers because the view can not direct interact with model because first we check the authentication or etc so that the first the view can request to the controller

//controller are one which are the interacting with models
const { bookstable } = require("../models/book.model");
const db = require("../db");
const eq = require("drizzle-orm");

//model is the database
exports.getAllBooks = async function (req, res) {
  const books = await db.select().from(bookstable);
  return res.json(books);
};

exports.getBookById = async function (req, res) {
  const id = req.params.id; // from the parameter  get me the id

  const [book] = await db
    .select()
    .from(bookstable)
    .where((table) => eq((table.id, id)))
    .limit(1); // this will check type of variable also so in the url you type id as string then you have to parseint the id or you remove one equal to sign

  if (!book)
    return res.status(404).json({ error: `book with ${id} doesnot exists!` });
  return res.json(book);
};

exports.createBook = async function (req, res) {
  const { title, description, authorid } = req.body;

  if (!title || title === "")
    return res.status(400).json({ error: "title is required" });

  const [result] = await db
    .insert(bookstable)
    .values({ title, description, authorid })
    .returning((id = bookstable.id));

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

  await db.delete(bookstable).where((table) => eq(table.id, id));

  return res.status(200).json({ message: "Book deleted" });
};

// controller is very critical and it is very secure file
// controller is something do from the DB or get from the DB
