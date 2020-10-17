export const dbConfig = [
        {
            name: 'default',
            type: 'postgres',
            host: typeof process.env.DB_HOST === 'undefined' ? 'db' : process.env.DB_HOST,
            port: 5432,
            username: typeof process.env.DB_USERNAME === 'undefined' ? 'prodbreakers' : process.env.DB_USERNAME,
            password: typeof process.env.DB_PASSWORD === 'undefined' ? 'MannCoTabetai' : process.env.DB_PASSWORD,
            database: 'prodbreakers',
            entities: [
                __dirname + '/entities/*.ts', //TODO: This MUST be changed to .js if you want to push to prod?
            ],
            synchronize: true,
            logging: true
        }
    ]