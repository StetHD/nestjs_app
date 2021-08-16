import {Controller, Get, UseInterceptors} from '@nestjs/common';
import {LoggingInterceptor} from '../common/interceptors/logging.interceptor';
import {CompanyService} from '../service/company.service';

@UseInterceptors(LoggingInterceptor)
@Controller('companies')
export class CompanyController {

    constructor(private readonly companyService: CompanyService) {
    }

    @Get()
    getCompanies() {
        return this.companyService.getCompanies();
    }
}
