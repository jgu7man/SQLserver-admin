import { Component, OnInit } from '@angular/core';
import { TipoIndustriaModel } from 'src/app/models/tipoindustria.model';
import { MantenimientoService } from '../../../../../services/mantenimiento.service';
import { AlertaService } from '../../../../../services/alerta.service';

@Component({
  selector: 'agregar-tipoIndustria',
  templateUrl: './agregar-tipoIndustria.component.html',
  styleUrls: ['./agregar-tipoIndustria.component.css']
})
export class AgregarTipoindustriaComponent implements OnInit {

  public tipoIndustria: TipoIndustriaModel
  constructor(
    private _mant: MantenimientoService,
    private _alerta: AlertaService
  ) {
    this.tipoIndustria = new TipoIndustriaModel(0,'',0,0)
   }

  ngOnInit() {
    var user = JSON.parse(sessionStorage.getItem('gvlog'))
    this.tipoIndustria.ModifiedBy = user.UserId
    this.tipoIndustria.CreatedBy = user.UserId
  }

  onSubmit() {
    this._mant.saveData('TipoIndustria', this.tipoIndustria).subscribe(res => {
      this._alerta.setAlerta(res)
    })
  }

}
