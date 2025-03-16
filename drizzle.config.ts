import type { Config } from "drizzle-kit";
export default {
  schema: "./src/lib/schema/*", // Path to your schema
  out: "./drizzle/migrations", // Output folder for migrations
  dialect: "postgresql", // PostgreSQL as the database dialect
  //driver: "pg", // Use "pg" as the driver
  dbCredentials: {
    // url: "postgresql://postgres:newsupabaseera50804807@skonzgtqlobalbcxllid.supabase.co:5432/postgres",
    url: "postgresql://postgres.skonzgtqlobalbcxllid:newsupabaseera50804807@aws-0-us-west-1.pooler.supabase.com:5432/postgres",
  },
};
