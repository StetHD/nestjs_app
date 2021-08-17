import {Module} from '@nestjs/common';
import {StationModule} from './module/station.module';
import {CompanyModule} from './module/company.module';
import {CompanyItemModule} from './module/company-item.module';
import {TypeOrmModule} from '@nestjs/typeorm';
import {ormConfig} from './orm.config';

@Module({
    imports: [
        TypeOrmModule.forRootAsync({useFactory: ormConfig}),
        StationModule,
        CompanyModule,
        CompanyItemModule
    ],
})
export class AppModule {
}
