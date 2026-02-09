const {
  pgTable,
  integer,
  varchar,
  uuid,
  text,
} = require("drizzle-orm/pg-core");

const author_table = pgTable("author", {
  id: uuid().primaryKey().defaultRandom(),
  firstname: varchar({ length: 50 }).notNull(),
  lastname: varchar({ length: 50 }),
  email: varchar({ length: 100 }).notNull().unique(),
});

module.exports = author_table;
