import { Module } from '@nestjs/common';
import { CompanyModule } from './company/company.module';
import { StationModule } from './station/station.module';

@Module({
  imports: [CompanyModule, StationModule],
})
export class AppModule {}
