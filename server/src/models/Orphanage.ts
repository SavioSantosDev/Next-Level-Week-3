import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn, OneToOne } from 'typeorm';

import OrphanageData from './OrphanageData';
import OrphanageVisits from './OrphanageVisits';
import OrphanageImages from './OrphanageImages';


@Entity('orphanages')
export default class Orphanage {

    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    name: string;

    // Dados do orfanato
    @OneToOne(() => OrphanageData, orphanageData => orphanageData.orphanage, {
        cascade: ['insert', 'update']
    })
    orphanage_data: OrphanageData;

    // Visitas
    @OneToOne(() => OrphanageVisits, orphanageVisits => orphanageVisits.orphanage, {
        cascade: ['insert', 'update']
    })
    orphanage_visits: OrphanageVisits;

    // Images
    @OneToMany(() => OrphanageImages, orphanageImages => orphanageImages.orphanage, {
        cascade: ['insert', 'update']
    })
    @JoinColumn({ name: 'orphanage_id' })
    orphanage_images: OrphanageImages[];
}
