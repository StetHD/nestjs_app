import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {StationRepository} from "../repository/station.repository";
import {StationDto} from './dto/station.dto';

@Injectable()
export class StationService {

    constructor(@InjectRepository(StationRepository) private stationRepository: StationRepository) {
    }

    getStations(): Promise<StationDto[]> {
        const stations: StationDto[] = [];
        return new Promise<StationDto[]>((resolve, _) => {
            resolve(stations);
        });
    }
}
