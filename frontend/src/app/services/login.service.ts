import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private _http: HttpClient) { }

  login(object: any): Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post('http://localhost:5000/login', object, {headers: headers});
  }
}
