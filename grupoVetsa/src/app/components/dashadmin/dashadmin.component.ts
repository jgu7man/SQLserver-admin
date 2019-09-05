import { Component, OnInit } from '@angular/core';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { Router } from '@angular/router';

@Component({
  selector: 'dashadmin',
  templateUrl: './dashadmin.component.html',
  styleUrls: ['./dashadmin.component.css']
})
export class DashadminComponent implements OnInit {

  public usuario: UsuarioModel
  constructor(
    private router: Router
  ) {
    this.usuario = new UsuarioModel(0,'','','')
   }

  ngOnInit() {
    var user = JSON.parse(sessionStorage.getItem('gvlog'))
    if (!user) {
      this.router.navigate(['/'])
    }
    this.usuario = user
  }

}
