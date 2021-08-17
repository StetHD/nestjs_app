import {
    Body,
    Controller,
    Delete,
    Get, Logger,
    Param,
    ParseUUIDPipe,
    Post,
    Put,
    Query,
    Req,
    UseInterceptors
} from '@nestjs/common';
import {LoggingInterceptor} from '../common/interceptors/logging.interceptor';
import {StationService} from '../service/station.service';
import {ApiOperation, ApiResponse, ApiTags} from '@nestjs/swagger';
import {CreateStationDto, StationDto, UpdateStationDto} from '../service/dto/station.dto';
import {Page, PageRequest} from '../domain/base/pagination.entity';
import {HeaderUtils} from '../common/header-utils';
import {Request} from 'express';

@ApiTags('station-resource')
@UseInterceptors(LoggingInterceptor)
@Controller('/api/stations')
export class StationController {
    logger = new Logger('StationController');

    constructor(private readonly stationService: StationService) {
    }

    @ApiOperation({
        description: 'Get stations'
    })
    @ApiResponse({
        status: 200,
        description: 'Stations retrieved',
        type: [StationDto]
    })
    @Get()
    async getAll(@Req() request: Request,
                 @Query('sort') sort,
                 @Query('page') page,
                 @Query('size') size,
    ): Promise<StationDto[]> {
        const pageRequest: PageRequest = new PageRequest(page, size, sort);
        const [stations, count] = await this.stationService.findAndCount({
            skip: +pageRequest.page * pageRequest.size,
            take: +pageRequest.size,
            order: pageRequest.sort.asOrder(),
        });

        HeaderUtils.addPaginationHeaders(request.res, new Page(stations, count, pageRequest));

        return stations;
    }

    @ApiOperation({
        description: 'Get a station'
    })
    @ApiResponse({
        status: 200,
        description: 'The found record',
        type: StationDto
    })
    @Get('/:id')
    async getOne(@Param('id') id: string): Promise<StationDto> {
        return await this.stationService.findById(id);
    }

    @ApiOperation({description: 'Create station'})
    @ApiResponse({
        status: 200,
        description: 'The record has been successfully created.',
        type: StationDto,
    })
    @Post()
    async createStation(@Body() createStationDto: CreateStationDto): Promise<StationDto> {
        return await this.stationService.save(createStationDto);
    }

    @ApiOperation({description: 'Update station'})
    @ApiResponse({
        status: 200,
        description: 'The record has been successfully updated.',
        type: StationDto,
    })
    @Put()
    async update(@Body() stationDto: StationDto): Promise<StationDto> {
        return await this.stationService.update(stationDto);
    }

    @ApiOperation({description: 'Update station with id'})
    @ApiResponse({
        status: 200,
        description: 'The record has been successfully updated.',
        type: StationDto,
    })
    @Put('/:id')
    async updateById(
        @Param('id', new ParseUUIDPipe()) id: string,
        @Body() stationDto: StationDto,
    ): Promise<StationDto> {
        return await this.stationService.update(stationDto);
    }

    @ApiOperation({description: 'Delete station'})
    @ApiResponse({
        status: 204,
        description: 'The record has been successfully deleted.',
    })
    @Delete('/:id')
    async deleteById(@Param('id') id: string): Promise<void> {
        return await this.stationService.deleteById(id);
    }
}
