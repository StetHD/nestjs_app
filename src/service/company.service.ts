import { Injectable } from '@nestjs/common';

@Injectable()
export class CompanyService {

    getCompanies() {
        return 'Companies';
    }
}