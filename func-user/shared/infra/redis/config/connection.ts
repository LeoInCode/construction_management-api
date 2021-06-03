import { createClient } from 'redis';

const client = createClient({
//   auth_pass: process.env.REDIS_PASSWORD,
//   host: process.env.REDIS_HOST,
//   port: +process.env.REDIS_PORT,
//   db: process.env.REDIS_DB
});

export default client