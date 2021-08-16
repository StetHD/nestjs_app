import {EntityRepository, Repository} from 'typeorm';
import {Company} from '../domain/company.entity';

@EntityRepository(Company)
export class CompanyRepository extends Repository<Company> {}
