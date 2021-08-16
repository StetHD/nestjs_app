import {BaseEntity} from './base/base.entity';
import {Column, Entity} from 'typeorm';

@Entity('techran_company')
export class Company extends BaseEntity {

    @Column({nullable: false})
    name: string;
}
