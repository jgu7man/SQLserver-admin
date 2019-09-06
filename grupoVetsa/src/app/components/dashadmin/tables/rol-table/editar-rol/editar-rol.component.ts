import { Component, OnInit } from '@angular/core';
import { RolModel } from 'src/app/models/rol.model';
import { MantenimientoService } from '../../../../../services/mantenimiento.service';
import { AlertaService } from '../../../../../services/alerta.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'editar-rol',
  templateUrl: './editar-rol.component.html',
  styleUrls: ['./editar-rol.component.css']
})
export class EditarRolComponent implements OnInit {

  public rol: RolModel
  public ruta
  public id
  constructor(
    private _mant: MantenimientoService,
    private _ruta: ActivatedRoute,
    private _alerta: AlertaService
  ) {
    this._ruta.params.subscribe(ruta => {
      this.ruta = ruta['string']
      this.id = ruta['id']
    })
    this.rol = new RolModel(0,'',0,0,)
   }

  ngOnInit() {
    this._mant.selectData(this.ruta, this.id).subscribe(res => {
      this.rol = res
      console.log(this.rol);
    })
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
