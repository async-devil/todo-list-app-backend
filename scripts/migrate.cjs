const { migrate } = require("postgres-migrations");
const pg = require("pg");
const path = require("path");

async function main() {
	const dbConfig = {
		host: process.env.POSTGRES_HOST,
		port: 5432,
		database: process.env.POSTGRES_DB,
		user: process.env.POSTGRES_USER,
		password: process.env.POSTGRES_PASSWORD,
	};

	const client = new pg.Client(dbConfig);
	await client.connect();
	try {
		await migrate({ client }, path.join(__dirname, "../src/migrations"));
	} finally {
		await client.end();
	}
}

void main();
