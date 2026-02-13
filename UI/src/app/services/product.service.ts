import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http:HttpClient) { }
   api = 'http://localhost:3000/api/products';
   weatherApi = 'http://localhost:3000/api/weather';

  getAll() {
    return this.http.get<any[]>(this.api);
  }
   getWeather(city: string) {
    return this.http.get<any>(this.weatherApi + '?city=' + city);
  }

  create(data: any) {
    return this.http.post(this.api, data);
  }

  delete(id: string) {
    return this.http.delete(this.api + '/' + id);
  }
  update(id: string, data: any) {
  return this.http.put(this.api + '/' + id, data);
}
}
