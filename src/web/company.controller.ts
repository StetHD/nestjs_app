import {Controller, Get, UseInterceptors} from '@nestjs/common';
import {LoggingInterceptor} from '../common/interceptors/logging.interceptor';
import {CompanyService} from '../service/company.service';
import {ApiOperation, ApiResponse, ApiTags} from '@nestjs/swagger';
import {CompanyDto} from "../service/dto/company.dto";

@ApiTags('company-resource')
@UseInterceptors(LoggingInterceptor)
@Controller('companies')
export class CompanyController {

    constructor(private readonly companyService: CompanyService) {
    }

    @ApiOperation({
        description: 'Get Companies.'
    })
    @ApiResponse({
        status: 200,
        description: 'company retrieved',
        type: [CompanyDto]
    })
    @Get()
    getCompanies(): Promise<CompanyDto[]> {
        return this.companyService.getCompanies();
    }
}
