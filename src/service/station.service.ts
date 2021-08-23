import {HttpException, HttpStatus, Injectable, Logger} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {StationRepository} from '../repository/station.repository';
import {CreateStationDto, StationDto} from './dto/station.dto';
import {Between, FindManyOptions, FindOneOptions} from 'typeorm';
import {StationMapper} from './mapper/station.mapper';

const relationshipNames = [];
relationshipNames.push('company');

@Injectable()
export class StationService {
    logger = new Logger('StationService');

    constructor(@InjectRepository(StationRepository) private stationRepository: StationRepository) {
    }

    async findById(id: string): Promise<StationDto | undefined> {
        const options = {relations: relationshipNames};
        const result = await this.stationRepository.findOne(id, options);
        return StationMapper.fromEntityToDTO(result);
    }

    async find(options: FindOneOptions<StationDto>): Promise<StationDto | undefined> {
        const result = await this.stationRepository.findOne(options);
        return StationMapper.fromEntityToDTO(result);
    }

    async findAndCount(options: FindManyOptions<StationDto>): Promise<[StationDto[], number]> {
        options.relations = relationshipNames;
        const resultList = await this.stationRepository.findAndCount(options);
        const stationDto: StationDto[] = [];
        const result: [StationDto[], number] = [[], 0];
        if (resultList && resultList[0]) {
            resultList[0].forEach(station => stationDto.push(StationMapper.fromEntityToDTO(station)));
            result[0] = stationDto;
            result[1] = resultList[1];
        }
        return result;
    }

    async findAndCountByCoordination(options: FindManyOptions<StationDto>,
                                     coordination: { longitude: number, latitude: number, radius: number }
    ): Promise<[StationDto[], number]> {
        options.relations = relationshipNames;
        options.where = {
            longitude: Between(coordination.longitude - coordination.radius, coordination.longitude + coordination.radius),
            latitude: Between(coordination.latitude - coordination.radius, coordination.latitude + coordination.radius),
        };
        const resultList = await this.stationRepository.findAndCount(options);
        const stationDto: StationDto[] = [];
        const result: [StationDto[], number] = [[], 0];
        if (resultList && resultList[0]) {
            resultList[0].forEach(station => stationDto.push(StationMapper.fromEntityToDTO(station)));
            result[0] = stationDto;
            result[1] = resultList[1];
        }
        return result;
    }

    async save(createStationDto: CreateStationDto): Promise<StationDto | undefined> {
        const station = StationMapper.fromDTOtoEntity(createStationDto);
        const result = await this.stationRepository.save(station);
        return StationMapper.fromEntityToDTO(result);
    }

    async update(stationDto: StationDto): Promise<StationDto | undefined> {
        const entity = StationMapper.fromDTOtoEntity(stationDto);
        const result = await this.stationRepository.save(entity);
        return StationMapper.fromEntityToDTO(result);
    }

    async deleteById(id: string): Promise<void | undefined> {
        await this.stationRepository.delete(id);
        const entityFind = await this.findById(id);
        if (entityFind) {
            throw new HttpException('Error, entity not deleted!', HttpStatus.NOT_FOUND);
        }
        return;
    }
}
