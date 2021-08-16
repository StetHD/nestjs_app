import { TypeOrmModuleOptions } from '@nestjs/typeorm';

function ormConfig(): TypeOrmModuleOptions {
    const commonConf = {
        SYNCRONIZE: false,
        ENTITIES: [__dirname + '/domain/*.entity{.ts,.js}'],
        MIGRATIONS: [__dirname + '/migrations/**/*{.ts,.js}'],
        CLI: {
            migrationsDir: 'src/migrations',
        },
        MIGRATIONS_RUN: true,
    };

    let ormOptions: TypeOrmModuleOptions = {
        name: 'default',
        type: 'postgres',
        logging: true,
        synchronize: true,
        entities: commonConf.ENTITIES,
        migrations: commonConf.MIGRATIONS,
        cli: commonConf.CLI,
        migrationsRun: commonConf.MIGRATIONS_RUN,
    };

    if (process.env.ENV === 'dev') {
        ormOptions = {
            name: 'default',
            type: 'postgres',
            database: 'techran',
            host: 'localhost',
            port: 5432,
            username: 'masoud',
            password: '',
            logging: true,
            synchronize: commonConf.SYNCRONIZE,
            entities: commonConf.ENTITIES,
            migrations: commonConf.MIGRATIONS,
            cli: commonConf.CLI,
            migrationsRun: commonConf.MIGRATIONS_RUN,
        };
    }

    if (process.env.ENV === 'prod') {
        ormOptions = {
            name: 'default',
            type: 'postgres',
            database: 'techran',
            host: 'localhost',
            port: 5432,
            username: 'masoud',
            password: '',
            logging: false,
            synchronize: commonConf.SYNCRONIZE,
            entities: commonConf.ENTITIES,
            migrations: commonConf.MIGRATIONS,
            cli: commonConf.CLI,
            migrationsRun: commonConf.MIGRATIONS_RUN,
        };
    }

    return ormOptions;
}

export { ormConfig };
