import { createApp } from "./app";
import { EnvSchema } from "./env";
import { Hono } from "hono";

const env = EnvSchema.parse(process.env);
const server = createApp(env);
export default new Hono().route("/server", server);
