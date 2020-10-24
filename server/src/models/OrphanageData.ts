import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne } from 'typeorm';

import Orphanage from './Orphanage';

@Entity('orphanages_data')
export default class OrphanageData {

    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    phone: string;

    @Column()
    latitude: number;

    @Column()
    longitude: number;
    
    @Column()
    about: string;

    @OneToOne(() => Orphanage, orphanage => orphanage.orphanageData)
    @JoinColumn({name: 'orphanage_id'})
    orphanage: Orphanage;
}
