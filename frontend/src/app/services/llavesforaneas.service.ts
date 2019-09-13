import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LlavesforaneasService {

  constructor(private _http: HttpClient) { }

  getFK(body: any): Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post('http://localhost:5000/getForanea', body, {headers: headers});
  }

}
