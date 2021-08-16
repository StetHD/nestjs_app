import {Controller, Get, UseInterceptors} from '@nestjs/common';
import {LoggingInterceptor} from '../common/interceptors/logging.interceptor';
import {StationService} from '../service/station.service';
import {ApiOperation, ApiResponse, ApiTags} from '@nestjs/swagger';
import {StationDto} from '../service/dto/station.dto';

@ApiTags('station-resource')
@UseInterceptors(LoggingInterceptor)
@Controller('stations')
export class StationController {

    constructor(private readonly stationService: StationService) {
    }

    @ApiOperation({
        description: 'Get Stations.'
    })
    @ApiResponse({
        status: 200,
        description: 'station retrieved',
        type: [StationDto]
    })
    @Get()
    getStations(): Promise<StationDto[]> {
        return this.stationService.getStations();
    }
}
