import { z } from "zod";

export type Env = z.infer<typeof EnvSchema>;

export const EnvSchema = z.object({
  DATABASE_URL: z.string(),
});
