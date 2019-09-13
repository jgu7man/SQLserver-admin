import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RefreshService {

  constructor(
    private router: Router,
    private ruta: ActivatedRoute
  ) {
    
  }
  
  toRefresh() {
    var url = window.location.pathname
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
      this.router.navigate([url])); 
    console.log(url);
  }
}
