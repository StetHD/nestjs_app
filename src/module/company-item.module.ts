import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {CompanyItemRepository} from '../repository/company-item.repository';
import {CompanyItemService} from '../service/company-item.service';


@Module({
    imports: [TypeOrmModule.forFeature([CompanyItemRepository])],
    providers: [CompanyItemService],
    exports: [CompanyItemService],
})
export class CompanyItemModule {
}
