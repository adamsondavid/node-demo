import { Env } from "./env";
import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "./db";
import { implement } from "@orpc/server";
import { contract } from "@/common/contract";
import { eq } from "drizzle-orm";

export function createRouter(env: Env) {
  const db = drizzle(env.DATABASE_URL, { schema });

  const os = implement(contract);

  const getByUserName = os.users.getByUserName.handler(async ({ input }) => {
    const users = await db.query.users.findMany({ where: eq(schema.users.name, input.name) });

    return users;
  });

  return os.router({
    users: { getByUserName },
  });
}
