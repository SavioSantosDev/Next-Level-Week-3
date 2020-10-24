import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class HappyService {

  private API = `${environment.API}orphanages`;

  constructor(
    private http: HttpClient
  ) { }


  createOrphanage(  orphanageData: any  ): Observable<unknown> {
    return this.http.post(this.API, orphanageData)
      .pipe(
        take(1)
      );
  }

}
