import {Client} from 'pg';

const {PG_HOST, PG_PORT, PG_DATABASE, PG_USERNAME, PG_PASSWORD} = process.env;
const dbOptions = {
    host: PG_HOST,
    port: PG_PORT,
    database: PG_DATABASE,
    user: PG_USERNAME,
    password: PG_PASSWORD,
    ssl: {
        rejectUnauthorized: false,
    },
    connectionTimeoutMillis: 5000,
}

export class pgService {
    private client: Client;

    constructor() {
        this.client = new Client(dbOptions)
    }

    async connect(): Promise<void> {
        await this.client.connect();
    }

    async disconnect(): Promise<void> {
        await this.client.end();
    }

    async beginTransaction(): Promise<void> {
        await this.client.query('BEGIN');
    }

    async commitTransaction(): Promise<void> {
        await this.client.query('COMMIT');
    }

    async rollbackTransaction(): Promise<void> {
        await this.client.query('ROLLBACK');
    }

    async createQuery(cb) {
        return await cb();
    }
}
