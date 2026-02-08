//views is the frontend which the user can see

//controllers are taking the request from the frontend(views) and interacting with out models means its act as the middlelayers because the view can not direct interact with model because first we check the authentication or etc so that the first the view can request to the controller


//controller are one which are the interacting with models
const { BOOKS } = require("../models/book");

//model is the database
exports.getAllBooks = function (req, res) {
  res.json(BOOKS);
};

exports.getBookById = function (req, res) {
  const id = parseInt(req.params.id); // from the parameter  get me the id

  if (isNaN(id))
    return res.status(400).json({ error: `the id must be a number` });
  const book = BOOKS.find((e) => e.id === id); // this will check type of variable also so in the url you type id as string then you have to parseint the id or you remove one equal to sign

  if (!book)
    return res.status(404).json({ error: `book with ${id} doesnot exists!` });
  return res.json(book);
};

exports.createBook = function (req, res) {
  const { title, author } = req.body;

  if (!title || title === "")
    return res.status(400).json({ error: "title is required" });
  if (!author || author === "")
    return res.status(400).json({ error: "author is required" });

  const id = BOOKS.length + 1;
  const book = { id, title, author };
  BOOKS.push(book);
  // console.log(req.headers);

  // console.log(req.body); //undefined --> express has no idea how to read different kind of data its depend on the content type and the based on that the body is processed so the express have concept which is middleware

  return res.status(201).json({ message: "Book created successful", id });
};

exports.deleteBookById = function (req, res) {
  const id = parseInt(req.params.id);
  if (isNaN(id))
    return res.status(400).json({ error: `the id must be a number` });

  const indexTodelete = BOOKS.findIndex((e) => e.id === id);

  if (indexTodelete < 0)
    return res.status(404).json({ error: `book with ${id} doesnot exists!` });

  BOOKS.splice(indexTodelete, 1);

  return res.status(200).json({ message: "Book deleted" });
};

// controller is very critical and it is very secure file
// controller is something do from the DB or get from the DB
