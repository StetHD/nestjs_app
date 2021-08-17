import {EntityRepository, Repository} from 'typeorm';
import {CompanyItem} from '../domain/company-item.entity';

@EntityRepository(CompanyItem)
export class CompanyItemRepository extends Repository<CompanyItem> {}
