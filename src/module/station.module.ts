import {Module} from '@nestjs/common';
import {StationController} from '../web/station.controller';
import {StationService} from '../service/station.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import {StationRepository} from '../repository/station.repository';

@Module({
    imports: [
        TypeOrmModule.forFeature([StationRepository]),
    ],
    controllers: [StationController],
    providers: [StationService],
    exports: [StationService],
})
export class StationModule {
}
