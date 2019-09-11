import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PermisosService {

  constructor(
    private _http: HttpClient
  ) { }

  getPermisosTable(): Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.get('http://localhost:5000/getRolPrivilegioTabla', {headers: headers});
  }

  getPermisos(id: number): Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.get('http://localhost:5000/getPrivilegiosByRol/'+id, {headers: headers});
  }
}
