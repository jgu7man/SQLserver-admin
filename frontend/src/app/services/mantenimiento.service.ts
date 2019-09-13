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
    return this._http.get('http://localhost:5000/getData/'+tabla, {headers: headers});
  }

  getTabla(tabla: string): Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.get('http://localhost:5000/getTabla/'+tabla, {headers: headers});
  }

  getNextPage(tabla: string, page:number): Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.get(`http://localhost:5000/nextPage/${tabla}/${page}`, {headers: headers});
  }

  getpreviusPage(tabla: string, page:number): Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.get(`http://localhost:5000/previusPage/${tabla}/${page}`, {headers: headers});
  }

  saveData(tabla: string, object: any): Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post('http://localhost:5000/save'+tabla, object, {headers: headers});
  }

  selectData(tabla: string, id: any): Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.get('http://localhost:5000/select/'+tabla+'/'+id, {headers: headers});
  }

  selectDataArray(tabla: string, id: any): Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.get('http://localhost:5000/selectArray'+tabla+'/'+id, {headers: headers});
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
