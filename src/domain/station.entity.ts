import {BaseEntity} from './base/base.entity';
import {Column, Entity} from 'typeorm';

@Entity('techran_station')
export class Station extends BaseEntity{

    @Column({nullable: false})
    name: string;

    @Column({nullable: false})
    latitude: number;

    @Column({nullable: false})
    longitude: number;
}
