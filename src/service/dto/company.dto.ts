import {ApiProperty} from '@nestjs/swagger';
import {BaseDTO} from './base.dto';
import {IsString} from 'class-validator';

export class CompanyDto extends BaseDTO {

    @ApiProperty({uniqueItems: true, example: 'techran company', description: 'Company Name', required: true})
    @IsString()
    name: string;
}
