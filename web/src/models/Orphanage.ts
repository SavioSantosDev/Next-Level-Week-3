import OrphanageData from './OrphanageData';
import OrphanageVisits from './OrphanageVisits';
import OrphanageImages from './OrphanageImages';

export default class Orphanage {

    id: number;

    name: string;

    orphanageData: OrphanageData;

    orphanageVisits: OrphanageVisits;

    orphanageImages: OrphanageImages[];
}
