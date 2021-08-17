import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import { CompanyItemDto }  from './dto/company-item.dto';
import { CompanyItemMapper }  from './mapper/company-item.mapper';
import { CompanyItemRepository } from '../repository/company-item.repository';

const relationshipNames = [];

@Injectable()
export class CompanyItemService {
    logger = new Logger('CompanyItemService');

    constructor(@InjectRepository(CompanyItemRepository) private companyItemRepository: CompanyItemRepository) {}

    async findById(id: string): Promise<CompanyItemDto | undefined> {
        const options = { relations: relationshipNames };
        const result = await this.companyItemRepository.findOne(id, options);
        return CompanyItemMapper.fromEntityToDTO(result);
    }

    async findByfields(options: FindOneOptions<CompanyItemDto>): Promise<CompanyItemDto | undefined> {
        const result = await this.companyItemRepository.findOne(options);
        return CompanyItemMapper.fromEntityToDTO(result);
    }

    async findAndCount(options: FindManyOptions<CompanyItemDto>): Promise<[CompanyItemDto[], number]> {
        options.relations = relationshipNames;
        const resultList = await this.companyItemRepository.findAndCount(options);
        const companyItemDto: CompanyItemDto[] = [];
        const result: [CompanyItemDto[], number] = [[], 0];
        if (resultList && resultList[0]) {
            resultList[0].forEach(companyItem => companyItemDto.push(CompanyItemMapper.fromEntityToDTO(companyItem)));
            result[0] = companyItemDto;
            result[1] = resultList[1];
        }
        return result;
    }

    async save(companyItemDto: CompanyItemDto): Promise<CompanyItemDto | undefined> {
        const entity = CompanyItemMapper.fromDTOtoEntity(companyItemDto);
        const result = await this.companyItemRepository.save(entity);
        return CompanyItemMapper.fromEntityToDTO(result);
    }

    async update(companyItemDto: CompanyItemDto): Promise<CompanyItemDto | undefined> {
        const entity = CompanyItemMapper.fromDTOtoEntity(companyItemDto);
        const result = await this.companyItemRepository.save(entity);
        return CompanyItemMapper.fromEntityToDTO(result);
    }

    async deleteById(id: string): Promise<void | undefined> {
        await this.companyItemRepository.delete(id);
        const entityFind = await this.findById(id);
        if (entityFind) {
            throw new HttpException('Error, entity not deleted!', HttpStatus.NOT_FOUND);
        }
        return;
    }
}
