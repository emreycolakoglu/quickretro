// app/instrumentation.ts
import { execSync } from "child_process";

// This function will run on server startup
export function register() {
  try {
    if (process.env.NODE_ENV === "production") {
      console.log("Running Prisma migrate deploy...");
      execSync("npx prisma migrate deploy", { stdio: "inherit" });
    } else {
      console.log("Running Prisma db push...");
      execSync("npx prisma db push", { stdio: "inherit" });
    }
    console.log("Database synchronized successfully.");
  } catch (error) {
    console.error("Error synchronizing database:", error);
  }
}
