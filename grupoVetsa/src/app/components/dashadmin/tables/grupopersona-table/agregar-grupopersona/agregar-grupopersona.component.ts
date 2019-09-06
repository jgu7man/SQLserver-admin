import { Component, OnInit } from '@angular/core';
import { GrupoPersonaModel } from 'src/app/models/grupopersona.model';
import { MantenimientoService } from '../../../../../services/mantenimiento.service';
import { AlertaService } from '../../../../../services/alerta.service';

@Component({
  selector: 'agregar-grupopersona',
  templateUrl: './agregar-grupopersona.component.html',
  styleUrls: ['./agregar-grupopersona.component.css']
})
export class AgregarGrupopersonaComponent implements OnInit {

  public grupoPersona: GrupoPersonaModel
  constructor(
    private _mant: MantenimientoService,
    private _alerta: AlertaService
  ) {
    this.grupoPersona = new GrupoPersonaModel(0,'',0,0)
   }

  ngOnInit() {
    var user = JSON.parse(sessionStorage.getItem('gvlog'))
    this.grupoPersona.ModifiedBy = user.UserId
    this.grupoPersona.CreatedBy = user.UserId
  }

  onSubmit() {
    this._mant.saveData('GrupoPersona', this.grupoPersona).subscribe(res => {
      this._alerta.setAlerta(res)
    })
  }

}
