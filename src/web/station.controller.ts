import {
    Body,
    Controller,
    Delete,
    Get, Logger,
    Param, ParseFloatPipe, ParseIntPipe,
    ParseUUIDPipe,
    Post,
    Put,
    Query,
    Req,
    UseInterceptors
} from '@nestjs/common';
import {LoggingInterceptor} from '../common/interceptors/logging.interceptor';
import {StationService} from '../service/station.service';
import {ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags} from '@nestjs/swagger';
import {CreateStationDto, StationDto} from '../service/dto/station.dto';
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

    @ApiQuery({
        name: 'long',
        type: Number,
        required: false,
        example: '2.45',
        description: 'Longitude of the point to query'
    })
    @ApiQuery({
        name: 'lat',
        type: Number,
        required: false,
        example: '1.22',
        description: 'Latitude of the point to query'
    })
    @ApiQuery({
        name: 'raduis',
        type: Number,
        required: false,
        example: '10.21',
        description: 'Radius from the point to query'
    })
    @ApiQuery({
        name: 'size',
        type: Number,
        required: false,
        example: '20',
        description: 'Pagination size'
    })
    @ApiQuery({
        name: 'page',
        type: Number,
        required: false,
        example: '10',
        description: 'Pagination page index'
    })
    @ApiQuery({
        name: 'sort',
        type: String,
        required: false,
        example: 'id,ASC',
        description: 'Sort result based on a field'
    })
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
                 @Query('long', ParseFloatPipe) longitude,
                 @Query('lat', ParseFloatPipe) latitude,
                 @Query('radius', ParseFloatPipe) radius,
                 @Query('sort') sort,
                 @Query('page', ParseIntPipe) page,
                 @Query('size', ParseIntPipe) size,
    ): Promise<StationDto[]> {
        this.logger.log(typeof latitude);
        this.logger.log(typeof longitude);
        this.logger.log(typeof radius);
        this.logger.log(`(lat: ${latitude}, long: ${longitude}) => radius: ${radius}`);

        const pageRequest: PageRequest = new PageRequest(page, size, sort);
        if (latitude && longitude && radius) {
            const [stations, _] = await this.stationService.findAndCountByCoordination({
                skip: pageRequest.page * pageRequest.size,
                take: pageRequest.size,
                order: pageRequest.sort.asOrder(),
            }, {
                longitude,
                latitude,
                radius,
            });

            return stations;
        } else {
            const [stations, count] = await this.stationService.findAndCount({
                skip: +pageRequest.page * pageRequest.size,
                take: +pageRequest.size,
                order: pageRequest.sort.asOrder(),
            });

            HeaderUtils.addPaginationHeaders(request.res, new Page(stations, count, pageRequest));

            return stations;
        }
    }

    @ApiParam({
        name: 'id',
        type: String,
        required: true,
        example: '73d993dd-766c-4c3b-b209-7b9b57289eaf',
        description: 'UUID of a station'
    })
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
