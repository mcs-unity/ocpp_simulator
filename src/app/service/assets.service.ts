import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICharger } from '../model/interface/bootNotification.model';

@Injectable({
  providedIn: 'root',
})
export class AssetsService {
  constructor(private http: HttpClient) {}

  chargers(): Observable<ICharger[]> {
    return this.http.get<ICharger[]>(
      'http://localhost:4200/assets/chargers.json'
    );
  }
}
