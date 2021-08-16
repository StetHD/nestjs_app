import {Controller, Get, UseInterceptors} from '@nestjs/common';
import {LoggingInterceptor} from '../common/interceptors/logging.interceptor';
import {StationService} from '../service/station.service';

@UseInterceptors(LoggingInterceptor)
@Controller('stations')
export class StationController {

    constructor(private readonly stationService: StationService) {
    }

    @Get()
    getStations() {
        return this.stationService.getStations();
    }
}
