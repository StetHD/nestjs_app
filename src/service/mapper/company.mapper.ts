import {Company} from '../../domain/company.entity';
import {CompanyDto} from '../dto/company.dto';


export class CompanyMapper {
    static fromDTOtoEntity(companyDto: CompanyDto): Company {
        if (!companyDto) {
            return;
        }
        const company = new Company();
        const fields = Object.getOwnPropertyNames(companyDto);
        fields.forEach(field => {
            company[field] = companyDto[field];
        });

        return company;
    }

    static fromEntityToDTO(company: Company): CompanyDto {
        if (!company) {
            return;
        }
        const companyDto = new CompanyDto();
        const fields = Object.getOwnPropertyNames(company);
        fields.forEach(field => {
            companyDto[field] = company[field];
        });

        return companyDto;
    }
}
