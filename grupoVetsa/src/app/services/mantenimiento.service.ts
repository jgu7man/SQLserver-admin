import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MantenimientoService {

  constructor(
    // tslint:disable-next-line:variable-name
    private _http: HttpClient
  ) { }

  getData(tabla: string): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.get('http://localhost:5000/tabla/' + tabla, {headers});
  }

  saveData(tabla: string, object: any): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post('http://localhost:5000/save' + tabla, object, {headers});
  }

  selectData(tabla: string, id: any): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.get('http://localhost:5000/select/' + tabla + '/' + id, {headers});
  }

  updateData(tabla: string, object: any): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post('http://localhost:5000/update' + tabla, object, {headers});
  }

  deleteData(tabla: string, id: any): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.delete('http://localhost:5000/delete/' + tabla + '/' + id, {headers});
  }

  deleteUser(tabla: string, id: any): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.delete('http://localhost:5000/delete' + tabla + '/' + id, {headers});
  }

}
