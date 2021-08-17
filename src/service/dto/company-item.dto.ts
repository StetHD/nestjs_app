import {ApiProperty} from '@nestjs/swagger';
import {BaseDto} from './base.dto';
import {CompanyDto} from './company.dto';

export class CompanyItemDto extends BaseDto {

    @ApiProperty({uniqueItems: true, example: 'techran company', description: 'Company Name', required: true})
    name: string;

    @ApiProperty({type: CompanyDto, isArray: true, description: 'Companies relationship'})
    companies: CompanyDto[];
}
