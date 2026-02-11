const { pgTable, varchar, uuid, text, index } = require("drizzle-orm/pg-core");
const { sql } = require("drizzle-orm");

const authortable = require("./author.model");

const books_table = pgTable(
  "books",
  {
    id: uuid().primaryKey().defaultRandom(),
    title: varchar({ length: 100 }).notNull(),
    description: text(),
    author_id: uuid()
      .references(() => authortable.id)
      .notNull(), //foreign relation ship
  },
  //this is extra config and its goes in call back function which return extra config
  //in the bracket it is the created table (table)
  (table) => ({
    searchindexontitle: index("title_index").using(
      "gin",
      sql`to_tsvector('english',${table.title})`,
    ),
    //we are putting up the index
  }),
);

module.exports = books_table;
