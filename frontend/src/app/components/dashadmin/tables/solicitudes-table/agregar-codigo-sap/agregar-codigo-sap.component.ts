import { Component, OnInit, Input } from '@angular/core';
import { CodigoSAPModel } from '../../../../../models/codigoSAP.model';
import { MantenimientoService } from '../../../../../services/mantenimiento.service';
import { AlertaService } from '../../../../../services/alerta.service';

@Component({
  selector: 'agregar-codigo-sap',
  templateUrl: './agregar-codigo-sap.component.html',
  styleUrls: ['./agregar-codigo-sap.component.css']
})
export class AgregarCodigoSAPComponent implements OnInit {

  public codigoSap: CodigoSAPModel
  @Input() clienteId
  @Input() clienteName
  constructor(
    private _mant: MantenimientoService,
    private _alerta: AlertaService
  ) {
    this.codigoSap = new CodigoSAPModel(0,'',0,0)
   }

  ngOnInit() {
    var user = JSON.parse(sessionStorage.getItem('gvlog'))
    this.codigoSap.CreatedBy = user.UserId
    this.codigoSap.ModifiedBy = user.UserId
  }

  onClose() {
    $("agregar-codigo-sap").fadeToggle()
  }

  onSubmit() {
    this.codigoSap.ClienteId = +this.clienteId
    console.log(this.codigoSap);
    this._mant.saveData('CodigoSap', this.codigoSap).subscribe(res => {
      this._alerta.setAlerta(res)
      $("agregar-codigo-sap").fadeToggle()
    })
  }

}
