import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  constructor(private _http: HttpClient) { }

  getClientesTable(): Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
    return this._http.get(`http://localhost:5000/getClienteTable`, {headers: headers})
  }

  getClientesTableNext(page: number): Observable<any>{
    let headers = new HttpHeaders().set('ContentType', 'application/json');
    return this._http.get(`http://localhost:5000/getClienteTableNext/${page}`, {headers: headers})
  }

  getClientesTablePrevious(page: number): Observable<any>{
    let headers = new HttpHeaders().set('ContentType', 'application/json');
    return this._http.get(`http://localhost:5000/getClienteTablePrevious/${page}`, {headers: headers})
  }

}
