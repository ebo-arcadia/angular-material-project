import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { City } from '../model/City';

@Injectable({
  providedIn: 'root'
})
export class CitiesService {
  constructor(private _httpClient: HttpClient) { }

  getCities():Observable<City[]> {
    return this._httpClient.get<City[]>("http://localhost:7100/cities");
  }
}
