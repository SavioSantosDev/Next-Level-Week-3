import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne } from 'typeorm';

import Orphanage from './Orphanage';

@Entity('orphanages_visits')
export default class OrphanageVisits {

    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    instructions: string;
    
    @Column()
    openning_hours: string;
   
    @Column()
    open_on_weekends: boolean;

    @OneToOne(() => Orphanage, orphanage => orphanage.orphanage_visits)
    @JoinColumn({ name: 'orphanage_id' })
    orphanage: Orphanage;

    // OBS: JoinColumn precisa ser definido somente em um lado da relação UM PARA UM.

}