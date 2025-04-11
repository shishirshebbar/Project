import dotenv from "dotenv";
dotenv.config({ path: "./.env.local" });

import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "./lib/drizzle/schema.js",  // ✅ Correct schema path
  dbCredentials: {
    url: process.env.POSTGRES_URL,
  },
});
