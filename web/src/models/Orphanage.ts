import OrphanageData from './OrphanageData';
import OrphanageVisits from './OrphanageVisits';
import OrphanageImages from './OrphanageImages';

export default class Orphanage {

    id: number;
    name: string;
    orphanage_data: OrphanageData;
    orphanage_visits: OrphanageVisits;
    orphanage_images: OrphanageImages[];
}
