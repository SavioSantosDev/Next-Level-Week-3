import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Orphanage } from 'src/models/Orphanage';


@Injectable({
  providedIn: 'root'
})
export class HappyService {

  constructor(
    private http: HttpClient
  ) { }

  submit(): void {

    console.log('upload');
  }

}
