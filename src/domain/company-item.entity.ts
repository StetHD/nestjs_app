import {BaseEntity} from './base/base.entity';
import {Column, Entity, ManyToMany} from 'typeorm';
import {Company} from './company.entity';

@Entity('techran_company_item')
export class CompanyItem extends BaseEntity {
    @Column({name: 'name', nullable: false})
    name: string;

    @ManyToMany(type => Company )
    companies: Company[];
}
