import { Component, OnInit } from '@angular/core';
import { GrupoPersonaModel } from 'src/app/models/grupopersona.model';
import { MantenimientoService } from '../../../../../services/mantenimiento.service';
import { AlertaService } from '../../../../../services/alerta.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'editar-grupopersona',
  templateUrl: './editar-grupopersona.component.html',
  styleUrls: ['./editar-grupopersona.component.css']
})
export class EditarGrupopersonaComponent implements OnInit {

  public grupoPersona: GrupoPersonaModel
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
    this.grupoPersona = new GrupoPersonaModel(0,'',0,0,)
   }

  ngOnInit() {
    this._mant.selectData(this.ruta, this.id).subscribe(res => {
      this.grupoPersona = res
    })
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
