const {
  pgTable,
  integer,
  varchar,
  uuid,
  text,
} = require("drizzle-orm/pg-core");

const authortable = require("./author.model");

const books_table = pgTable("books", {
  id: uuid().primaryKey().defaultRandom(),
  title: varchar({ length: 100 }).notNull(),
  description: text(),
  author_id: uuid()
    .references(() => authortable.id)
    .notNull(), //foreign relation ship
});

module.exports = books_table;
