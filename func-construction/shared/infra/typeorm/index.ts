import { createConnection } from 'typeorm';

const host:string = process.env.POSTGRE_DB_HOST;
const username:string = process.env.POSTGRE_DB_USERNAME;
const password:string = process.env.POSTGRE_DB_PASSWORD;
const database:string = process.env.POSTGRE_DB_DATABASE;
const port:number = +process.env.POSTGRE_DB_PORT;
const schema:string = process.env.POSTGRE_DB_SCHEMA;
const ssl:boolean = (process.env.POSTGRE_DB_SSL === "true");

createConnection({
    type: "postgres",
    host: host,
    port: port,
    username: username,
    password: password,
    database: database,
    schema: schema,
    extra: {
      ssl: ssl,
      rejectUnauthorized: false,
    },
    entities: ["./dist/shared/infra/typeorm/entities/**/*.js"],
    migrations: ["./shared/infra/typeorm/migrations/*.ts"],
    cli: {
      entitiesDir: "./shared/infra/typeorm/entities",
      migrationsDir: "./shared/infra/typeorm/migrations",
    }
});