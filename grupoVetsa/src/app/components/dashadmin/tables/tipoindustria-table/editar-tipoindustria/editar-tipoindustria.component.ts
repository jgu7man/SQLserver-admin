import { Component, OnInit } from '@angular/core';
import { TipoIndustriaModel } from 'src/app/models/tipoindustria.model';
import { MantenimientoService } from '../../../../../services/mantenimiento.service';
import { AlertaService } from '../../../../../services/alerta.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'editar-tipoindustria',
  templateUrl: './editar-tipoindustria.component.html',
  styleUrls: ['./editar-tipoindustria.component.css']
})
export class EditarTipoIndustriaComponent implements OnInit {

  public tipoindustria: TipoIndustriaModel;
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
    this.tipoindustria = new TipoIndustriaModel(0, '', 0, 0, );
   }

  ngOnInit() {
    this._mant.selectData(this.ruta, this.id).subscribe(res => {
      this.tipoindustria = res;
      console.log(this.tipoindustria);
    });
    // tslint:disable-next-line:prefer-const
    let user = JSON.parse(sessionStorage.getItem('gvlog'));
    this.tipoindustria.ModifiedBy = user.UserId;
    this.tipoindustria.CreatedBy = user.UserId;
  }

  onSubmit() {
    this._mant.saveData('TipoIndustria', this.tipoindustria).subscribe(res => {
      this._alerta.setAlerta(res);
    });
  }
  onEdit() {
    this._mant.updateData(this.ruta, this.tipoindustria).subscribe(res => {
      console.log(res);
      this._alerta.setAlerta(res);
    });
  }

}
