import { Injectable } from '@nestjs/common';

@Injectable()
export class StationService {

    getStations() {
        return 'Stations';
    }
}
