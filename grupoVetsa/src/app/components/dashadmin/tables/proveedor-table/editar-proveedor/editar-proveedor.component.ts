import { Component, OnInit } from '@angular/core';
import { ProveedorModel } from 'src/app/models/proveedor.model';
import { MantenimientoService } from '../../../../../services/mantenimiento.service';
import { AlertaService } from '../../../../../services/alerta.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'editar-proveedor',
  templateUrl: './editar-proveedor.component.html',
  styleUrls: ['./editar-proveedor.component.css']
})
export class EditarProveedorComponent implements OnInit {

  public proveedor: ProveedorModel
  public Pais_items = []
  public Segmento_items = []
  public Cliente_items = []
  public GrupoPersona_items = []
  public ruta
  public id
  constructor(
    private _mant: MantenimientoService,
    private _ruta: ActivatedRoute,
    private _alerta: AlertaService
  ) {
    this._ruta.params.subscribe(ruta => {
      this.ruta = ruta['string']
      this.id = ruta['id']
    })
    this.proveedor = new ProveedorModel(0,'','',0,0,0,0,0,0,0,0)
   }

  ngOnInit() {
    this.getTablas()
    this._mant.selectData(this.ruta, this.id).subscribe(res => {
      this.proveedor = res
      console.log(this.proveedor);
    })
    var user = JSON.parse(sessionStorage.getItem('gvlog'))
    this.proveedor.ModifiedBy = user.UserId
    this.proveedor.CreatedBy = user.UserId
  }

  getTablas() {
    this._mant.getData('Cliente').subscribe(res => { this.Cliente_items = res })
    this._mant.getData('Pais').subscribe(res => { this.Pais_items = res })
    this._mant.getData('Segmento').subscribe(res => { this.Segmento_items = res })
    this._mant.getData('GrupoPersona').subscribe( res => { this.GrupoPersona_items = res })
  }

  onSubmit() {
    this._mant.saveData('Proveedor', this.proveedor).subscribe(res => {
      this._alerta.setAlerta(res)
    })
  }

  

}
