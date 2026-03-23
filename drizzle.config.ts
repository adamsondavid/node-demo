import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./src/server/db.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
