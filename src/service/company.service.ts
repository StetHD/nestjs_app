import {HttpException, HttpStatus, Injectable, Logger} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {CompanyRepository} from '../repository/company.repository';
import {CompanyDto, CreateCompanyDto, UpdateCompanyDto} from './dto/company.dto';
import {FindManyOptions} from 'typeorm';
import {CompanyMapper} from './mapper/company.mapper';
import {StationDto} from "./dto/station.dto";

const relationshipNames = [];
relationshipNames.push('companyItems');

@Injectable()
export class CompanyService {
    logger = new Logger('CompanyService');

    constructor(@InjectRepository(CompanyRepository) private companyRepository: CompanyRepository) {
    }

    async findById(id: string): Promise<CompanyDto | undefined> {
        const options = { relations: relationshipNames };
        const result = await this.companyRepository.findOne(id, options);
        return CompanyMapper.fromEntityToDTO(result);
    }

    async find(options: FindManyOptions<CompanyDto>): Promise<CompanyDto | undefined> {
        const result = await this.companyRepository.findOne(options);
        return CompanyMapper.fromEntityToDTO(result);
    }

    async findAndCount(options: FindManyOptions<CompanyDto>): Promise<[CompanyDto[], number]> {
        options.relations = relationshipNames;
        const resultList = await this.companyRepository.findAndCount(options);
        const companyDto: CompanyDto[] = [];
        const result: [CompanyDto[], number] = [[], 0];
        if (resultList && resultList[0]) {
            resultList[0].forEach(company => companyDto.push(CompanyMapper.fromEntityToDTO(company)));
            result[0] = companyDto;
            result[1] = resultList[1];
        }
        return result;
    }

    async save(createCompanyDto: CreateCompanyDto): Promise<CompanyDto | undefined> {
        const company = CompanyMapper.fromDTOtoEntity(createCompanyDto);
        const result = await this.companyRepository.save(company);
        return CompanyMapper.fromEntityToDTO(result);
    }

    async update(companyDto: CompanyDto): Promise<CompanyDto | undefined> {
        const entity = CompanyMapper.fromDTOtoEntity(companyDto);
        const result = await this.companyRepository.save(entity);
        return CompanyMapper.fromEntityToDTO(result);
    }

    async deleteById(id: string): Promise<void | undefined> {
        await this.companyRepository.delete(id);
        const entityFind = await this.findById(id);
        if (entityFind) {
            throw new HttpException('Error, entity not deleted!', HttpStatus.NOT_FOUND);
        }
        return;
    }
}
