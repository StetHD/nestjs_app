import {PrimaryGeneratedColumn, Column} from 'typeorm';

export abstract class BaseEntity {

    @PrimaryGeneratedColumn('uuid')
    id?: string;

    @Column({nullable: true})
    createdDate?: Date;

    @Column({nullable: true})
    lastModifiedDate?: Date;
}
