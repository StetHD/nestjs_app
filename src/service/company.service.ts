import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {CompanyRepository} from "../repository/company.repository";
import {CompanyDto} from "./dto/company.dto";
import {StationDto} from "./dto/station.dto";
import {rejects} from "assert";

@Injectable()
export class CompanyService {

    constructor(@InjectRepository(CompanyRepository) private companyRepository: CompanyRepository) {}

    getCompanies(): Promise<CompanyDto[]> {
        const companies: CompanyDto[] = [];

        return new Promise<CompanyDto[]>((resolve, _) => {
            resolve(companies);
        });
    }
}
