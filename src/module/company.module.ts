import { Module } from '@nestjs/common';
import { CompanyController } from '../web/company.controller';
import {CompanyService} from '../service/company.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import {CompanyRepository} from '../repository/company.repository';

@Module({
  imports: [
      TypeOrmModule.forFeature([CompanyRepository]),
  ],
  controllers: [CompanyController],
  providers: [CompanyService]
})
export class CompanyModule {}
