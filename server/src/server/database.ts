import r from "rethinkdb";
import { logger } from "./logger";

const dbName = "quick_retro";

export async function connectToDB() {
  const connection = await r.connect({
    host: "localhost", // Update with your RethinkDB host
    port: 28015, // Default port for RethinkDB
    db: dbName, // Database name
  });
  return connection;
}

export async function setupDB() {
  const conn = await connectToDB();

  const dblist = await r.dbList().run(conn);
  if (!dblist.includes(dbName)) {
    await r.dbCreate(dbName).run(conn);
  }

  const tables = ["users", "sessions", "retrospectives", "issues"];
  const existingTableList = await r.db(dbName).tableList().run(conn);

  const missingTables = tables.filter(
    (table) => !existingTableList.includes(table)
  );
  for (const missingTable of missingTables) {
    logger.debug(`Creating table: ${missingTable}`);
    await r.db(dbName).tableCreate(missingTable).run(conn);
  }

  logger.debug("Database setup completed.");
}
