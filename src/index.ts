import { join } from "path";

import autoLoad from "@fastify/autoload";
import postgres from "@fastify/postgres";
import { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";
import fastify, { RouteOptions } from "fastify";

const server = fastify().withTypeProvider<TypeBoxTypeProvider>();

const routes: RouteOptions[] = [];

void server.register(autoLoad, {
	dir: join(__dirname, "routes"),
	dirNameRoutePrefix: false,
	options: { prefix: "/api" },
});

const host = process.env.POSTGRES_HOST;
const port = 5432;
const database = process.env.POSTGRES_DB;
const user = process.env.POSTGRES_USER;
const password = process.env.POSTGRES_PASSWORD;

void server.register(postgres, {
	connectionString: `postgres://${user}:${password}@${host}:${port}/${database}`,
});

server.addHook("onRoute", (route) => {
	routes.push(route);
});

function printRoute(route: RouteOptions) {
	console.log(`Route ${route.method.toString()} ${route.url} initialized`);
}

server.listen({ port: 8080, host: "0.0.0.0" }, (err, address) => {
	if (err) {
		console.error(err);
		process.exit(1);
	}
	console.log(`Server is listening at ${address}\n`);

	for (const route of routes) printRoute(route);
});
