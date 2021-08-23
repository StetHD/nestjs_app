import {PrimaryGeneratedColumn, Column} from 'typeorm';

export abstract class BaseEntity {

    @PrimaryGeneratedColumn('uuid')
    id?: string;

    @Column({name: 'created_date', nullable: false, default: () => 'now()'})
    createdDate?: Date;

    @Column({name: 'last_modified_date', nullable: true, default: () => 'now()'})
    modifiedDate?: Date;
}
