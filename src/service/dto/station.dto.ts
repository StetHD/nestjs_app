import {ApiProperty} from '@nestjs/swagger';
import {BaseDTO} from './base.dto';
import {IsNumber, IsString} from 'class-validator';

export class StationDto extends BaseDTO {

    @ApiProperty({required: true, uniqueItems: true, example: "techran station", description: "Station Name"})
    @IsString()
    name: string;

    @ApiProperty({required: true, example: 23.12, description: "Latitude"})
    @IsNumber()
    latitude: number;

    @ApiProperty({required: true, example: 43.12, description: "Longitude"})
    @IsNumber()
    longitude: number;
}
