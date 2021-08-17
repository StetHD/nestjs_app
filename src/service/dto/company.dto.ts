import {ApiProperty, PartialType} from '@nestjs/swagger';
import {BaseDto} from './base.dto';
import {IsString} from 'class-validator';
import {StationDto} from './station.dto';
import {CompanyItemDto} from './company-item.dto';

export class CompanyDto extends BaseDto {

    @ApiProperty({uniqueItems: true, example: 'techran company', description: 'Company Name', required: true})
    @IsString()
    name: string;

    @ApiProperty({type: StationDto, isArray: true, description: 'Stations relationship'})
    stations?: StationDto[];

    @ApiProperty({type: CompanyItemDto, isArray: true, description: 'Companies relationship'})
    companyItems?: CompanyItemDto[];
}

export class CreateCompanyDto {

    @ApiProperty({uniqueItems: true, example: 'techran company', description: 'Company Name', required: true})
    @IsString()
    name: string;
}

export class UpdateCompanyDto extends PartialType(CreateCompanyDto) {
}
