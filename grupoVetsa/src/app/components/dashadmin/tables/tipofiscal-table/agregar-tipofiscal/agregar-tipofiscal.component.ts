import { Component, OnInit } from '@angular/core';
import { TipoFiscalModel } from 'src/app/models/tipofiscal.model';
import { MantenimientoService } from '../../../../../services/mantenimiento.service';
import { AlertaService } from '../../../../../services/alerta.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'agregar-tipoFiscal',
  templateUrl: './agregar-tipoFiscal.component.html',
  styleUrls: ['./agregar-tipoFiscal.component.css']
})
export class AgregarTipofiscalComponent implements OnInit {

  public tipoFiscal: TipoFiscalModel;
  constructor(
    // tslint:disable-next-line:variable-name
    private _mant: MantenimientoService,
    // tslint:disable-next-line:variable-name
    private _alerta: AlertaService
  ) {
    this.tipoFiscal = new TipoFiscalModel(0, '', 0, 0);
   }

  ngOnInit() {
    const user = JSON.parse(sessionStorage.getItem('gvlog'));
    this.tipoFiscal.ModifiedBy = user.UserId;
    this.tipoFiscal.CreatedBy = user.UserId;
  }

  onSubmit() {
    this._mant.saveData('TipoFiscal', this.tipoFiscal).subscribe(res => {
      this._alerta.setAlerta(res);
    });
  }

}
