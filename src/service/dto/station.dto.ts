import {ApiProperty, PartialType} from '@nestjs/swagger';
import {BaseDto} from './base.dto';
import {IsNumber, IsString} from 'class-validator';
import {CompanyDto} from './company.dto';

export class StationDto extends BaseDto {

    @ApiProperty({required: true, uniqueItems: true, example: 'techran station', description: 'Station Name'})
    @IsString()
    name: string;

    @ApiProperty({required: true, example: 23.12, description: 'Latitude'})
    @IsNumber()
    latitude: number;

    @ApiProperty({required: true, example: 43.12, description: 'Longitude'})
    @IsNumber()
    longitude: number;

    @ApiProperty({type: CompanyDto, description: 'Company relationship'})
    company: CompanyDto;
}

export class CreateStationDto {

    @ApiProperty({required: true, uniqueItems: true, example: 'techran station', description: 'Station Name'})
    @IsString()
    name: string;

    @ApiProperty({required: true, example: 23.12, description: 'Latitude'})
    @IsNumber()
    latitude: number;

    @ApiProperty({required: true, example: 43.12, description: 'Longitude'})
    @IsNumber()
    longitude: number;

    @ApiProperty({type: CompanyDto, description: 'Company relationship'})
    company: CompanyDto;
}

export class UpdateStationDto extends PartialType(CreateStationDto) {
}
