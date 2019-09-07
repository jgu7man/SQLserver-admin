import { Component, OnInit } from '@angular/core';
import { TipoIndustriaModel } from 'src/app/models/tipoindustria.model';
import { MantenimientoService } from '../../../../../services/mantenimiento.service';
import { AlertaService } from '../../../../../services/alerta.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'agregar-tipoIndustria',
  templateUrl: './agregar-tipoIndustria.component.html',
  styleUrls: ['./agregar-tipoIndustria.component.css']
})
export class AgregarTipoindustriaComponent implements OnInit {

  public tipoIndustria: TipoIndustriaModel;
  constructor(
    // tslint:disable-next-line:variable-name
    private _mant: MantenimientoService,
    // tslint:disable-next-line:variable-name
    private _alerta: AlertaService
  ) {
    this.tipoIndustria = new TipoIndustriaModel(0, '', 0, 0);
   }

  ngOnInit() {
    // tslint:disable-next-line:prefer-const
    let user = JSON.parse(sessionStorage.getItem('gvlog'));
    this.tipoIndustria.ModifiedBy = user.UserId;
    this.tipoIndustria.CreatedBy = user.UserId;
  }

  onSubmit() {
    this._mant.saveData('TipoIndustria', this.tipoIndustria).subscribe(res => {
      this._alerta.setAlerta(res);
    });
  }

}
