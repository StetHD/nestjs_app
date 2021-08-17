import {BaseEntity} from './base/base.entity';
import {Column, Entity, ManyToOne} from 'typeorm';
import {Company} from './company.entity';

@Entity('techran_station')
export class Station extends BaseEntity{

    @Column({name: 'name', nullable: false})
    name: string;

    @Column({type: 'decimal', name: 'latitude', nullable: false})
    latitude: number;

    @Column({type: 'decimal', name: 'longitude', nullable: false})
    longitude: number;

    @ManyToOne(type => Company)
    company: Company;
}
