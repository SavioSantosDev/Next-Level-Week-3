import Orphanage from '../models/Orphanage';
import ImagesView from './images_view';

export default {
    render(orphanage: Orphanage) {
        return {
            id: orphanage.id,
            name: orphanage.name,

            latitude: orphanage.orphanageData.latitude,
            longitude: orphanage.orphanageData.longitude,
            about: orphanage.orphanageData.about,

            instructions: orphanage.orphanageVisits.instructions,
            opening_hours: orphanage.orphanageVisits.opening_hours,
            open_on_weekend: orphanage.orphanageVisits.open_on_weekends,

            images: ImagesView.renderMany(orphanage.orphanageImages)
        };
    },

    renderMany(orphanages: Orphanage[]) {
        return orphanages.map(orphanage => this.render(orphanage));
    }
};