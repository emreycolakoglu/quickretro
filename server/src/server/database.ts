import r from "rethinkdb";

export async function connectToDB() {
  const connection = await r.connect({
    host: "localhost", // Update with your RethinkDB host
    port: 28015, // Default port for RethinkDB
    db: "quick_retro", // Database name
  });
  return connection;
}
