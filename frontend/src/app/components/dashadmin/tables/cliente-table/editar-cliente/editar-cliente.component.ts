import { Component, OnInit } from '@angular/core';
import { ClienteModel } from 'src/app/models/cliente.model';
import { MantenimientoService } from '../../../../../services/mantenimiento.service';
import { AlertaService } from '../../../../../services/alerta.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'editar-cliente',
  templateUrl: './editar-cliente.component.html',
  styleUrls: ['./editar-cliente.component.css']
})
export class EditarClienteComponent implements OnInit {

  public cliente: ClienteModel
  public TipoFiscal_items = []
  public LineaProducto_items = []
  public Pais_items = []
  public TipoIndustria_items = []
  public Segmento_items = []
  public ruta
  public id
  constructor(
    private _mant: MantenimientoService,
    private _ruta: ActivatedRoute,
    private _alerta: AlertaService,
    private router: Router
  ) {
    this._ruta.params.subscribe(ruta => {
      this.ruta = ruta['string']
      this.id = ruta['id']
    })
    this.cliente = new ClienteModel(1,'','',1,'','','',1,'','','',1,'','',1,1,'','',1,1,1,1,1)
   }

  ngOnInit() {
    this.getTablas()
    this._mant.selectData(this.ruta, this.id).subscribe(res => {
      this.cliente = res
      console.log(this.cliente);
    })
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
    this.cliente.LineaProducto = +this.cliente.LineaProducto
    this.cliente.Pais = +this.cliente.Pais
    this.cliente.TipoRegistro = +this.cliente.TipoRegistro
    this.cliente.TipoIndustria = +this.cliente.TipoIndustria
    this.cliente.Segmento = +this.cliente.Segmento
    this.cliente.Mercado = +this.cliente.Mercado
    this.cliente.PaisFacturacion = +this.cliente.PaisFacturacion
    this.cliente.TipoPago = +this.cliente.TipoPago
    this._mant.updateData('Cliente', this.cliente).subscribe(res => {
      this._alerta.setAlerta(res)
      this.router.navigate(['/dashadmin/mantenimiento/Cliente'])
    })
  }

  

}