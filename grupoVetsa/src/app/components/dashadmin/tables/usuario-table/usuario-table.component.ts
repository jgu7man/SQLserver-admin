import { Component, OnInit, Input } from '@angular/core';
import { MantenimientoService } from '../../../../services/mantenimiento.service';

@Component({
  selector: 'usuario-table',
  templateUrl: './usuario-table.component.html',
  styleUrls: ['./usuario-table.component.css']
})
export class UsuarioTableComponent implements OnInit {

  public usuarios
  constructor(
    private _mant: MantenimientoService
  ) {
    this._mant.getData('Usuario').subscribe(res => {
      this.usuarios = res
    })
   }

  ngOnInit() {
  }

}
