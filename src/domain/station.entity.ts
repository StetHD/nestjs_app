import {BaseEntity} from './base/base.entity';
import {Column, Entity} from 'typeorm';
import {ApiProperty} from '@nestjs/swagger';

@Entity('techran_station')
export class Station extends BaseEntity{

    @ApiProperty({required: true, uniqueItems: true, example: "techran station", description: "Station Name"})
    @Column({nullable: false})
    name: string;

    @ApiProperty({required: true, example: 23.12, description: "Latitude"})
    @Column({nullable: false})
    latitude: number;

    @ApiProperty({required: true, example: 43.12, description: "Longitude"})
    @Column({nullable: false})
    longitude: number;
}
