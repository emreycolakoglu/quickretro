// app/instrumentation.ts

// This function will run on server startup
export async function register() {
  try {
    if (
      process.env.NODE_ENV === "production" &&
      process.env.NEXT_RUNTIME === "nodejs"
    ) {
      const { execSync } = await import("child_process");
      console.log("Running Prisma migrate deploy...");
      execSync("npx prisma migrate deploy", { stdio: "inherit" });
    }
    console.log("Database synchronized successfully.");
  } catch (error) {
    console.error("Error synchronizing database:", error);
  }
}
