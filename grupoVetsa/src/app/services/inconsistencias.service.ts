import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class InconsistenciasService {

  constructor(private _http: HttpClient) { }

  getInconsistenciasTable(): Observable<any> {
    let headers = new HttpHeaders().set('ContentType', 'application/json');
    return this._http.get(`http://localhost:5000/getInconsistenciaTable`, { headers: headers })
  }

  getInconsistenciasTableNext(page: number): Observable<any> {
    let headers = new HttpHeaders().set('ContentType', 'application/json');
    return this._http.get(`http://localhost:5000/getInconsistenciaTableNext/${page}`, { headers: headers })
  }

  getInconsistenciasTablePrevious(page: number): Observable<any> {
    let headers = new HttpHeaders().set('ContentType', 'application/json');
    return this._http.get(`http://localhost:5000/getInconsistenciaTablePrevious/${page}`, { headers: headers })
  }
}