import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProveedoresService {

  constructor(private _http: HttpClient) { }

  getProveedoresTable(): Observable<any> {
    let headers = new HttpHeaders().set('ContentType', 'application/json');
    return this._http.get(`http://localhost:5000/getProveedorTable`, { headers: headers })
  }

  getProveedoresTableNext(page: number): Observable<any> {
    let headers = new HttpHeaders().set('ContentType', 'application/json');
    return this._http.get(`http://localhost:5000/getProveedorTableNext/${page}`, { headers: headers })
  }

  getProveedoresTablePrevious(page: number): Observable<any> {
    let headers = new HttpHeaders().set('ContentType', 'application/json');
    return this._http.get(`http://localhost:5000/getProveedorTablePrevious/${page}`, { headers: headers })
  }
}
