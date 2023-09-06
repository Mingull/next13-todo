import { drizzle } from "drizzle-orm/mysql2";
import { migrate } from "drizzle-orm/mysql2/migrator";
import { createConnection } from "mysql2";

import "dotenv/config";

// inspired by Raphael Moreau @rphlmr for Postgres, extended for Planetscale
const runMigrate = async () => {
	if (!process.env.DATABASE_URL) {
		throw new Error("DATABASE_URL is not defined");
	}

	const connection = createConnection({
		uri: process.env.DATABASE_URL,
	});

	const db = drizzle(connection);

	console.log("⏳ Running migrations...");

	const start = Date.now();

	await migrate(db, { migrationsFolder: "src/lib/db/migrations" });

	const end = Date.now();

	console.log(`✅ Migrations completed in ${end - start}ms`);

	process.exit(0);
};

runMigrate().catch((err) => {
	console.error("❌ Migration failed");
	console.error(err);
	process.exit(1);
});
