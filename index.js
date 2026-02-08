const express = require("express");

const app = express();
const bookrouter = require("./Routes/book.routes");

const { loger } = require("./middleware/loger");
const PORT = 8000;

//in memory database this is violating the rule which is the stateless means that in the stateless you can not create the data inside the memory(server) you have create outside the memory and that is database which called stateless but here donot use the database

//middlewares (plugins)
app.use(express.json());
// what it will do if some data comes from the frontend and it has header that is application/json and it will do all the transformation for me and give me actual data in the request .body

//custom middlewares
app.use(loger);

//Routes

app.use("/books", bookrouter); // if there is any routes which starts with/books move(delegate) that request to bookrouter

app.listen(PORT, () => {
  console.log(`HTTP server is running on PORT number ${PORT}`);
});
