import {CompanyItem} from '../../domain/company-item.entity';
import {CompanyItemDto} from '../dto/company-item.dto';

export class CompanyItemMapper {

    static fromDTOtoEntity(companyItemDto: CompanyItemDto): CompanyItem {
        if (!companyItemDto) {
            return;
        }
        const companyItem = new CompanyItem();
        const fields = Object.getOwnPropertyNames(companyItemDto);
        fields.forEach(field => {
            companyItem[field] = companyItemDto[field];
        });

        return companyItem;
    }

    static fromEntityToDTO(companyItem: CompanyItem): CompanyItemDto {
        if (!companyItem) {
            return;
        }
        const companyItemDto = new CompanyItemDto();
        const fields = Object.getOwnPropertyNames(companyItem);
        fields.forEach(field => {
            companyItemDto[field] = companyItem[field];
        });

        return companyItemDto;
    }
}
