import { Hono } from "hono";
import { sValidator } from "@hono/standard-validator";
import { z } from "zod";
import { Env } from "./env";
import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "./db";
import { eq } from "drizzle-orm";

export type AppType = ReturnType<typeof createApp>;

export function createApp(env: Env) {
  const db = drizzle(env.DATABASE_URL, { schema });

  return new Hono().get(
    "/users/:userName",
    sValidator(
      "param",
      z.object({
        userName: z.string(),
      }),
    ),
    async (c) => {
      const { userName } = c.req.valid("param");
      const res = await db.query.users.findMany({ where: eq(schema.users.name, userName) });
      return c.json(res);
    },
  );
}
