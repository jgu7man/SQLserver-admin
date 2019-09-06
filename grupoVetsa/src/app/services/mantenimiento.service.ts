import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MantenimientoService {

  constructor(
    private _http: HttpClient
  ) { }

  getData(tabla: string): Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.get('http://localhost:5000/tabla/'+tabla, {headers: headers});
  }

  saveData(tabla: string, object: any): Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post('http://localhost:5000/save'+tabla, object, {headers: headers});
  }

  selectData(tabla: string, id: any): Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.get('http://localhost:5000/select/'+tabla+'/'+id, {headers: headers});
  }

  updateData(tabla: string, object: any): Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post('http://localhost:5000/update'+tabla, object, {headers: headers});
  }

  deleteData(tabla: string, id: any): Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.delete('http://localhost:5000/delete/'+tabla+'/'+id, {headers: headers});
  }

  deleteUser(tabla: string, id: any): Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.delete('http://localhost:5000/delete'+tabla+'/'+id, {headers: headers});
  }

}
