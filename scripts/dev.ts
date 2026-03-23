import { rm } from "node:fs/promises";
import EmbeddedPostgres from "embedded-postgres";
import { pushSchema } from "drizzle-kit/api";
import * as schema from "../src/server/db";
import { users } from "@/server/db";
import { drizzle } from "drizzle-orm/node-postgres";
import { spawn } from "node:child_process";

const user = "postgres";
const password = "password";
const port = 6577;
const LOCAL_DATABASE_URL = `postgres://${user}:${password}@localhost:${port}`;

await rm("./dev-db", { recursive: true, force: true });
const embeddedPostgres = new EmbeddedPostgres({ databaseDir: "./dev-db", user, password, port, persistent: false });
await embeddedPostgres.initialise();
await embeddedPostgres.start();

// seed the db:
const db = drizzle(LOCAL_DATABASE_URL);
await pushSchema(schema, db).then((changes) => changes.apply());
console.log("here");
await db.insert(users).values([
  { name: "Jan", email: "jan@hotmail.com", age: 22 },
  { name: "Olaf", email: "olaf@gmail.com", age: 55 },
  { name: "Jonas", email: "jonas@web.de", age: 32 },
  { name: "Chris", email: "chris@gmail.com", age: 54 },
]);

process.stdout.write("\x1Bc"); // clear console

// start the dev servers:
process.env.DATABASE_URL = LOCAL_DATABASE_URL;
spawn("vite", { stdio: "inherit", shell: true });
spawn("npx drizzle-kit studio", { stdio: "inherit", shell: true });
