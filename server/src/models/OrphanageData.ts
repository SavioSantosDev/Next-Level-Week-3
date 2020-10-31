import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne } from 'typeorm';

import Orphanage from './Orphanage';

@Entity('orphanages_data')
export default class OrphanageData {

    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    about: string;

    @Column()
    phone: string;

    @Column()
    latitude: number;

    @Column()
    longitude: number;

    @OneToOne(() => Orphanage, orphanage => orphanage.orphanage_data)
    @JoinColumn({ name: 'orphanage_id' })
    orphanage: Orphanage;
}
