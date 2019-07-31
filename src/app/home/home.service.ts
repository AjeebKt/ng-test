import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(
    private http: HttpClient
  ) { }

  getPriceList(): Observable<any> {
    return this.http.get('https://api.myjson.com/bins/112tnh');
  }
}
