import { createApp } from "./app";
import { EnvSchema } from "@/server/env";

const validatedEnv = EnvSchema.parse(process.env);

export default createApp(validatedEnv);
