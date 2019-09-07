import { Component, OnInit } from '@angular/core';
import { TipoFiscalModel } from 'src/app/models/tipofiscal.model';
import { MantenimientoService } from '../../../../../services/mantenimiento.service';
import { AlertaService } from '../../../../../services/alerta.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'editar-tipofiscal',
  templateUrl: './editar-tipofiscal.component.html',
  styleUrls: ['./editar-tipofiscal.component.css']
})
export class EditarTipofiscalComponent implements OnInit {

  public tipoFiscal: TipoFiscalModel;
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
    this.tipoFiscal = new TipoFiscalModel(0, '', 0, 0, );
   }

  ngOnInit() {
    this._mant.selectData(this.ruta, this.id).subscribe(res => {
      this.tipoFiscal = res;
      console.log(this.tipoFiscal);
    });
    // tslint:disable-next-line:prefer-const
    let user = JSON.parse(sessionStorage.getItem('gvlog'));
    this.tipoFiscal.ModifiedBy = user.UserId;
    this.tipoFiscal.CreatedBy = user.UserId;
  }

  onSubmit() {
    this._mant.saveData('TipoFiscal', this.tipoFiscal).subscribe(res => {
      this._alerta.setAlerta(res);
    });
  }
  onEdit() {
    this._mant.updateData(this.ruta, this.tipoFiscal).subscribe(res => {
      console.log(res);
      this._alerta.setAlerta(res);
    });
  }
}
