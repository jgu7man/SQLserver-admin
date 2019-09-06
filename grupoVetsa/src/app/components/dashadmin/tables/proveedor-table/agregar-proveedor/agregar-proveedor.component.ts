import { Component, OnInit } from '@angular/core';
import { ProveedorModel } from '../../../../../models/proveedor.model';
import { MantenimientoService } from '../../../../../services/mantenimiento.service';
import { AlertaService } from '../../../../../services/alerta.service';

@Component({
  selector: 'agregar-proveedor',
  templateUrl: './agregar-proveedor.component.html',
  styleUrls: ['./agregar-proveedor.component.css']
})
export class AgregarProveedorComponent implements OnInit {

  public proveedor: ProveedorModel
  public Pais_items = []
  public Segmento_items = []
  public Cliente_items = []
  public GrupoPersona_items = []
  constructor(
    private _mant: MantenimientoService,
    private _alerta: AlertaService
  ) {
    this.proveedor = new ProveedorModel(0,'','',0,0,0,0,0,0,0,0)
   }

  ngOnInit() {
    this.getTablas()
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
