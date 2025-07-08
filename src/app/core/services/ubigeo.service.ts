import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UbigeoService {
  private basePath = 'assets/ubigeo';

  constructor(private http: HttpClient) {}

  getDepartments(): Observable<any[]> {
    return this.http.get<any[]>(`${this.basePath}/departments.json`);
  }

  getProvinces(): Observable<any[]> {
    return this.http.get<any[]>(`${this.basePath}/provinces.json`);
  }

  getDistricts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.basePath}/districts.json`);
  }
}
