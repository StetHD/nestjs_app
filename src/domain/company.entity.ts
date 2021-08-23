import {BaseEntity} from './base/base.entity';
import {Column, Entity, JoinTable, ManyToMany, OneToMany} from 'typeorm';
import {Station} from './station.entity';
import {CompanyItem} from './company-item.entity';

@Entity('techran_company')
export class Company extends BaseEntity {

    @Column({name: 'name', nullable: false})
    name: string;

    @OneToMany(type => Station, other => other.company)
    stations?: Station[];

    @ManyToMany(type => CompanyItem)
    @JoinTable({
        name: 'rel_company__company_item',
        joinColumn: { name: 'company_id', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'company_item_id', referencedColumnName: 'id' }
    })
    companyItems?: CompanyItem[];
}
