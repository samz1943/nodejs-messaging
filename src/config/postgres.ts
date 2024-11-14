import { DataSource, DataSourceOptions } from "typeorm";
import { SeederOptions } from 'typeorm-extension';
import dotenv from 'dotenv';
import MainSeeder from "../database/postgres/seeders/main.seeder";

dotenv.config();

const options: DataSourceOptions & SeederOptions = {
    type: "postgres",
    host: process.env.DB_HOST ?? '',
    port: parseInt(process.env.DB_PORT || '5432', 10),
    username: process.env.DB_USERNAME ?? '',
    password: process.env.DB_PASSWORD ?? '',
    database: process.env.DB_DATABASE ?? '',
    entities: ['src/database/postgres/models/*.ts'],
    migrations: ["src/database/postgres/migrations/*.ts"],
    seeds: [MainSeeder],
    factories: ['src/database/postgres/factories/*.ts'],
    synchronize: false,
    logging: true,
};

export const AppDataSource = new DataSource(options);
