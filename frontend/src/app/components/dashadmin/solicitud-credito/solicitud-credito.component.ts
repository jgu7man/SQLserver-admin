import { Component, OnInit, Input } from '@angular/core';
import { SolicitudCreditoModel } from '../../../models/solicitud-credito.model';
import { MantenimientoService } from '../../../services/mantenimiento.service';
import { AlertaService } from '../../../services/alerta.service';
import { RefreshService } from '../../../services/refresh.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'solicitud-credito',
  templateUrl: './solicitud-credito.component.html',
  styleUrls: ['./solicitud-credito.component.css']
})
export class SolicitudCreditoComponent implements OnInit {

  @Input() cliente
  public Solicitud: SolicitudCreditoModel;
  public Cliente_items = []
  public TipoPago_items = []
  public Moneda_items = []
  constructor(
    private _mant: MantenimientoService,
    private _alerta: AlertaService,
    private _refresh: RefreshService,
  ) {
    this.Solicitud = new SolicitudCreditoModel(0, 0, '', '', '', 0, 0, 0, '', 1, '', 0, 0, 0)
    
   }

  ngOnInit() {
    var user = JSON.parse(sessionStorage.getItem('gvlog'))
    this.Solicitud.CreatedBy = user.UserId
    this.Solicitud.ModifiedBy = user.UserId
    this.getTablas()
    this.Solicitud.Cliente = this.cliente

  }

  getTablas() {
    this._mant.getData('Moneda').subscribe(res => {
      this.Moneda_items = res;
    })
    this._mant.getData('TipoPago').subscribe(res => {
      this.TipoPago_items = res;
    })
  }

  onClose() {
    $("solicitud-credito").fadeToggle()
  }

  onSubmit() {
    this.Solicitud.Moneda = +this.Solicitud.Moneda
    this.Solicitud.TipoPago = +this.Solicitud.TipoPago
    this.Solicitud.Cliente = +this.cliente
    this._mant.saveData('Solicitud', this.Solicitud).subscribe(res => {
      this._alerta.setAlerta(res)
      $("solicitud-credito").fadeToggle()
        this._refresh.toRefresh()
    })
  }

}
