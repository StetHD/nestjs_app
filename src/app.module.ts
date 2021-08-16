import {Module} from '@nestjs/common';
import {CompanyModule} from './module/company.module';
import {StationModule} from './module/station.module';
import {TypeOrmModule} from '@nestjs/typeorm';
import {ormConfig} from './orm.config';

@Module({
    imports: [
        TypeOrmModule.forRootAsync({useFactory: ormConfig}),
        CompanyModule,
        StationModule
    ],
})
export class AppModule {
}
