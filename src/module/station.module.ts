import { Module } from '@nestjs/common';
import { StationController } from '../web/station.controller';
import {StationService} from '../service/station.service';

@Module({
  controllers: [StationController],
  providers: [StationService]
})
export class StationModule {}
