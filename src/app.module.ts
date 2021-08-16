import { Module } from '@nestjs/common';
import { CompanyModule } from './module/company.module';
import { StationModule } from './module/station.module';

@Module({
  imports: [CompanyModule, StationModule],
})
export class AppModule {}
