import { integer, PgDatabase, pgTable, uuid, varchar } from "drizzle-orm/pg-core";
import { randomUUID } from "node:crypto";

export type Db = PgDatabase<any>;

export const users = pgTable("users", {
  id: uuid()
    .primaryKey()
    .$defaultFn(() => randomUUID()),
  name: varchar({ length: 255 }).notNull(),
  age: integer().notNull(),
  email: varchar({ length: 255 }).notNull(),
});
