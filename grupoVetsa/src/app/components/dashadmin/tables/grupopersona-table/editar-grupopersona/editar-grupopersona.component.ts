import { Component, OnInit } from '@angular/core';
import { GrupoPersonaModel } from 'src/app/models/grupopersona.model';
import { MantenimientoService } from '../../../../../services/mantenimiento.service';
import { AlertaService } from '../../../../../services/alerta.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'editar-grupopersona',
  templateUrl: './editar-grupopersona.component.html',
  styleUrls: ['./editar-grupopersona.component.css']
})
export class EditarGrupopersonaComponent implements OnInit {

  public grupoPersona: GrupoPersonaModel;
  public ruta;
  public id;
  constructor(
    // tslint:disable-next-line:variable-name
    private _mant: MantenimientoService,
    // tslint:disable-next-line:variable-name
    private _ruta: ActivatedRoute,
    // tslint:disable-next-line:variable-name
    private _alerta: AlertaService
  ) {
    this._ruta.params.subscribe(ruta => {
      this.ruta = ruta['string'];
      this.id = ruta['id'];
    });
    this.grupoPersona = new GrupoPersonaModel(0, '', 0, 0, );
   }

  ngOnInit() {
    this._mant.selectData(this.ruta, this.id).subscribe(res => {
      this.grupoPersona = res;
      console.log(this.grupoPersona);
    });
    // tslint:disable-next-line:prefer-const
    let user = JSON.parse(sessionStorage.getItem('gvlog'));
    this.grupoPersona.ModifiedBy = user.UserId;
    this.grupoPersona.CreatedBy = user.UserId;
  }

  onSubmit() {
    this._mant.saveData('GrupoPersona', this.grupoPersona).subscribe(res => {
      this._alerta.setAlerta(res);
    });
  }
  onEdit() {
    this._mant.updateData(this.ruta, this.grupoPersona).subscribe(res => {
      console.log(res);
      this._alerta.setAlerta(res);
    });
  }
}
