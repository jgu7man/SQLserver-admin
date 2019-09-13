import { Component, OnInit } from '@angular/core';
import { RolModel } from 'src/app/models/rol.model';
import { MantenimientoService } from '../../../../../services/mantenimiento.service';
import { AlertaService } from '../../../../../services/alerta.service';

@Component({
  selector: 'agregar-rol',
  templateUrl: './agregar-rol.component.html',
  styleUrls: ['./agregar-rol.component.css']
})
export class AgregarRolComponent implements OnInit {

  public rol: RolModel
  constructor(
    private _mant: MantenimientoService,
    private _alerta: AlertaService
  ) {
    this.rol = new RolModel(0,'',0,0)
   }

  ngOnInit() {
    var user = JSON.parse(sessionStorage.getItem('gvlog'))
    this.rol.ModifiedBy = user.UserId
    this.rol.CreatedBy = user.UserId
  }

  onSubmit() {
    this._mant.saveData('Rol', this.rol).subscribe(res => {
      this._alerta.setAlerta(res)
    })
  }

}
