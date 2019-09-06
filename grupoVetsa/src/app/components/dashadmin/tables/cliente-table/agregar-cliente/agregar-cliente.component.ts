import { Component, OnInit } from '@angular/core';
import { ClienteModel } from 'src/app/models/cliente.model';
import { MantenimientoService } from '../../../../../services/mantenimiento.service';
import { AlertaService } from '../../../../../services/alerta.service';

@Component({
  selector: 'agregar-cliente',
  templateUrl: './agregar-cliente.component.html',
  styleUrls: ['./agregar-cliente.component.css']
})
export class AgregarClienteComponent implements OnInit {

  public cliente: ClienteModel
  public TipoFiscal_items = []
  public LineaProducto_items = []
  public Pais_items = []
  public TipoIndustria_items = []
  public Segmento_items = []
  constructor(
    private _mant: MantenimientoService,
    private _alerta: AlertaService
  ) {
    this.cliente = new ClienteModel(0,'','',0,'','','',0,'','','',0,'','',0,0,'','',0,0,0)
   }

  ngOnInit() {
    this.getTablas()
    var user = JSON.parse(sessionStorage.getItem('gvlog'))
    this.cliente.ModifiedBy = user.UserId
    this.cliente.CreatedBy = user.UserId
  }

  getTablas() {
    this._mant.getData('TipoFiscal').subscribe(res => { this.TipoFiscal_items = res })
    this._mant.getData('LineaProducto').subscribe(res => { this.LineaProducto_items = res })
    this._mant.getData('Pais').subscribe(res => { this.Pais_items = res })
    this._mant.getData('TipoIndustria').subscribe(res => { this.TipoIndustria_items = res })
    this._mant.getData('Segmento').subscribe( res => { this.Segmento_items = res })
  }

  onSubmit() {
    this._mant.saveData('Cliente', this.cliente).subscribe(res => {
      this._alerta.setAlerta(res)
    })
  }

  

}
