import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PlantouneService {
  plantLiked$ = new Subject<any>();

  constructor(private httpClient: HttpClient) { }

  getData(): Observable<any[]> {
    return this.httpClient.get<any[]>('http://localhost:3000/list_products');
  }

  getDataId(product_id:any): Observable<any[]>{
    return this.httpClient.get<any[]>('http://localhost:3000/list_products?product_id='+product_id);
  }

  getPlantFav(userId: number): Observable<any[]> {
    return this.httpClient.get<any[]>('http://localhost:3000/favPlant?userId='+userId)
  }


}
