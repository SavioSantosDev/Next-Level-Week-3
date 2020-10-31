import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import Orphanage from 'src/models/Orphanage';


@Injectable({
  providedIn: 'root'
})
export class HappyService {

  private API = environment.API;

  private orphanages: Orphanage[] = [];

  constructor(
    private http: HttpClient
  ) { }


  listOrphanages(  url: string): Observable<unknown> {
    return this.http.get(`${this.API}${url}`);
  }


  createOrphanage(  modelData: any, images: Set<File>  ): Observable<unknown> {

    // Desestruturando
    const {
      name,
      orphanage_data: {
        about,
        phone,
        latitude,
        longitude,
      },
      orphanage_visits: {
        instructions,
        openning_hours,
        open_on_weekends
      }
    } = modelData;
    // ***

    const formData = new FormData();

    formData.append('name', name);

    formData.append('about', about);
    formData.append('phone', phone);
    formData.append('latitude', latitude);
    formData.append('longitude', longitude);

    formData.append('instructions', instructions);
    formData.append('openning_hours', openning_hours);
    formData.append('open_on_weekends', open_on_weekends);

    if (images) {
      images.forEach(  image => formData.append('orphanage_images', image, image.name)  );
    }

    return this.http.post(`${this.API}orphanages`, formData)
      .pipe(
        take(1)
      );
  }

}
