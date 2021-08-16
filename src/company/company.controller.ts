import {Controller, Get} from '@nestjs/common';
import {CompanyService} from "./company.service";

@Controller('companies')
export class CompanyController {

    constructor(private readonly companyService: CompanyService) {
    }

    @Get()
    getCompanies() {
        return this.companyService.getCompanies();
    }
}
