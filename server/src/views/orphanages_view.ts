import Orphanage from '../models/Orphanage';
import ImagesView from './images_view';

export default {
    render(orphanage: Orphanage) {
        return {
            id: orphanage.id,
            name: orphanage.name,

            orphanage_data: {
                phone: orphanage.orphanage_data.phone,
                latitude: orphanage.orphanage_data.latitude,
                longitude: orphanage.orphanage_data.longitude,
                about: orphanage.orphanage_data.about,
            },
            orphanage_visits: {
                instructions: orphanage.orphanage_visits.instructions,
                opening_hours: orphanage.orphanage_visits.openning_hours,
                open_on_weekend: orphanage.orphanage_visits.open_on_weekends,
            },

            orphanage_images: ImagesView.renderMany(orphanage.orphanage_images)
        };
    },

    renderMany(orphanages: Orphanage[]) {
        return orphanages.map(orphanage => this.render(orphanage));
    }
};