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
import {CompanyService} from '../service/company.service';
import {ApiOperation, ApiResponse, ApiTags} from '@nestjs/swagger';
import {CompanyDto, CreateCompanyDto} from '../service/dto/company.dto';
import {Page, PageRequest} from '../domain/base/pagination.entity';
import {HeaderUtils} from '../common/header-utils';
import {Request} from 'express';

@ApiTags('company-resource')
@UseInterceptors(LoggingInterceptor)
@Controller('/api/companies')
export class CompanyController {
    logger = new Logger('CompanyController');

    constructor(private readonly companyService: CompanyService) {
    }

    @ApiOperation({
        description: 'Get companies'
    })
    @ApiResponse({
        status: 200,
        description: 'Companies retrieved',
        type: [CompanyDto]
    })
    @Get()
    async getAllCompanies(@Req() request: Request,
                          @Query('sort') sort,
                          @Query('page') page,
                          @Query('size') size,
    ): Promise<CompanyDto[]> {
        const pageRequest: PageRequest = new PageRequest(page, size, sort);
        const [companies, count] = await this.companyService.findAndCount({
            skip: +pageRequest.page * pageRequest.size,
            take: +pageRequest.size,
            order: pageRequest.sort.asOrder(),
        });

        HeaderUtils.addPaginationHeaders(request.res, new Page(companies, count, pageRequest));

        return companies;
    }

    @ApiOperation({
        description: 'Get a company'
    })
    @ApiResponse({
        status: 200,
        description: 'The found record',
        type: CompanyDto
    })
    @Get('/:id')
    async getOne(@Param('id') id: string): Promise<CompanyDto> {
        return await this.companyService.findById(id);
    }

    @ApiOperation({description: 'Create company'})
    @ApiResponse({
        status: 200,
        description: 'The record has been successfully created.',
        type: CompanyDto,
    })
    @Post()
    async createCompany(@Body() createCompanyDto: CreateCompanyDto): Promise<CompanyDto> {
        return await this.companyService.save(createCompanyDto);
    }

    @ApiOperation({description: 'Update company'})
    @ApiResponse({
        status: 200,
        description: 'The record has been successfully updated.',
        type: CompanyDto,
    })
    @Put()
    async put(@Body() companyDto: CompanyDto): Promise<CompanyDto> {
        return await this.companyService.update(companyDto);
    }

    @ApiOperation({description: 'Update company with id'})
    @ApiResponse({
        status: 200,
        description: 'The record has been successfully updated.',
        type: CompanyDto,
    })
    @Put('/:id')
    async putId(
        @Param('id', new ParseUUIDPipe()) id: string,
        @Body() companyDto: CompanyDto,
    ): Promise<CompanyDto> {
        return await this.companyService.update(companyDto);
    }

    @Delete('/:id')
    @ApiOperation({description: 'Delete company'})
    @ApiResponse({
        status: 204,
        description: 'The record has been successfully deleted.',
    })
    async deleteById(@Req() req: Request, @Param('id') id: string): Promise<void> {
        return await this.companyService.deleteById(id);
    }
}
