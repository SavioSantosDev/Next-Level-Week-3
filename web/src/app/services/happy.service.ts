import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import Orphanage from 'src/models/Orphanage';


@Injectable({
  providedIn: 'root'
})
export class HappyService {

  private API = environment.API;

  constructor(
    private http: HttpClient
  ) { }


  /**
   * Não é necessário retornar todos os dados para listagem de orfanatos
   * Apenas as propriedades abaixo serão retornadas
   */
  listOrphanages(): Observable<{
    id: number,
    name: string,
    latitude: number,
    longitude: number
  }[]> {
    return this.http.get<Orphanage[]>(`${this.API}orphanages`).pipe(
      take(1),
      map(  (response: Orphanage[]) => response.map( (orphanage: Orphanage) => {
        return {
          id: orphanage.id,
          name: orphanage.name,
          latitude: orphanage.orphanage_data.latitude,
          longitude: orphanage.orphanage_data.longitude
        };
      })  ),
    );
  }


  showOrphanage(  id: number | string  ): Observable<Orphanage> {
    return this.http.get<Orphanage>(`${this.API}orphanages/${id}`).pipe(take(1));
  }


  createOrphanage(  modelData: any, images: Set<File>  ): Observable<Orphanage> {

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

    return this.http.post<Orphanage>(`${this.API}orphanages`, formData).pipe(take(1));
  }

}
