import { Hono } from "hono";
import { sValidator } from "@hono/standard-validator";
import { z } from "zod";
import { type Env } from "./env";

export type AppType = ReturnType<typeof createApp>;

export function createApp(env: Env) {
  const greeting = env.GREETING ?? "Hello";

  return new Hono().basePath("/server").get(
    "/greeting",
    sValidator(
      "query",
      z.object({
        name: z.string(),
      }),
    ),
    (c) => {
      const query = c.req.valid("query");
      return c.json({ message: `${greeting} ${query.name}` });
    },
  );
}
