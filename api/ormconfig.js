module.exports = {
	type: "postgres",
	host: process.env.POSTGRES_HOST,
	port: Number(process.env.POSTGRES_PORT),
	username: process.env.POSTGRES_USER,
	password: process.env.POSTGRES_PASSWORD,
	database: process.env.POSTGRES_DATABASE,
	entities: ["dist/models/**/*.js"],
	migrations: ["dist/migration/**/*.js"],
	subscribers: ["dist/subscriber/**/*.js"],
	synchronize: false,
	migrationsRun: true,
	cli: {
		migrationsDir: "src/migration",
	},
};
