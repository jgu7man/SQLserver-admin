import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(private _http: HttpClient) { }

  getUsuariosTable(): Observable<any>{
    let headers = new HttpHeaders().set('ContentType', 'application/json');
    return this._http.get(`http://localhost:5000/getUsuarioTable`, {headers: headers})
  }

  getUsuariosTableNext(page: number): Observable<any>{
    let headers = new HttpHeaders().set('ContentType', 'application/json');
    return this._http.get(`http://localhost:5000/getUsuarioTableNext/${page}`, {headers: headers})
  }

  getUsuariosTablePrevious(page: number): Observable<any>{
    let headers = new HttpHeaders().set('ContentType', 'application/json');
    return this._http.get(`http://localhost:5000/getUsuarioTablePrevious/${page}`, {headers: headers})
  }
}
