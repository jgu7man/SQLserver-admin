import { Component, OnInit } from '@angular/core';
import { UsuarioModel } from '../../../../../models/usuario.model';
import { MantenimientoService } from '../../../../../services/mantenimiento.service';
import { AlertaService } from '../../../../../services/alerta.service';
import { Router } from '@angular/router';

@Component({
  selector: 'add-usuario',
  templateUrl: './add-usuario.component.html',
  styleUrls: ['./add-usuario.component.css']
})
export class AddUsuarioComponent implements OnInit {

  public usuario: UsuarioModel
  constructor(
    private _mant: MantenimientoService,
    private _alerta: AlertaService,
  ) {
    this.usuario = new UsuarioModel(0,'','','','',0,0)
   }

  ngOnInit() {
    var user =  JSON.parse(sessionStorage.getItem('gvlog'))
    this.usuario.CreatedBy = user.UserId
    this.usuario.ModifiedBy = user.UserId
  }

  onSubmit() {
    this._mant.saveData('Usuario', this.usuario).subscribe(res => {
      this._alerta.setAlerta(res)
    })
  }

}
