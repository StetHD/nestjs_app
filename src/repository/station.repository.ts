import {EntityRepository, Repository} from 'typeorm';
import {Station} from '../domain/station.entity';

@EntityRepository(Station)
export class StationRepository extends Repository<Station> {}
