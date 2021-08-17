import {Station} from '../../domain/station.entity';
import {StationDto} from '../dto/station.dto';


export class StationMapper {
    static fromDTOtoEntity(stationDto: StationDto): Station {
        if (!stationDto) {
            return;
        }
        const station = new Station();
        const fields = Object.getOwnPropertyNames(stationDto);
        fields.forEach(field => {
            station[field] = stationDto[field];
        });

        return station;
    }

    static fromEntityToDTO(station: Station): StationDto {
        if (!station) {
            return;
        }
        const stationDto = new StationDto();
        const fields = Object.getOwnPropertyNames(station);
        fields.forEach(field => {
            stationDto[field] = station[field];
        });

        return stationDto;
    }
}
