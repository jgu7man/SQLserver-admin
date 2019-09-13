import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CreditoService {

  constructor(private _http: HttpClient) { }

  sendEfectivo(object): Observable<any>{
    console.log(object);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post('http://localhost:5000/enviarEfectivo', object, {headers: headers});
  }

  getTabla(tabla: string): Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.get('http://localhost:5000/getTablaSolicitud/'+tabla, {headers: headers});
  }

  getNextPage(tabla: string, page:number): Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.get(`http://localhost:5000/nextPageSolicitud/${tabla}/${page}`, {headers: headers});
  }

  getpreviusPage(tabla: string, page:number): Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.get(`http://localhost:5000/previusPageSolicitud/${tabla}/${page}`, {headers: headers});
  }
}
