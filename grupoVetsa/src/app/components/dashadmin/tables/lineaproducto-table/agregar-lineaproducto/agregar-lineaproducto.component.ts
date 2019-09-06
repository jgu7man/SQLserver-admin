import { Component, OnInit } from '@angular/core';
import { LineaProductoModel } from 'src/app/models/lineaproducto.model';
import { MantenimientoService } from '../../../../../services/mantenimiento.service';
import { AlertaService } from '../../../../../services/alerta.service';

@Component({
  selector: 'agregar-lineaproducto',
  templateUrl: './agregar-lineaproducto.component.html',
  styleUrls: ['./agregar-lineaproducto.component.css']
})
export class AgregarLineaproductoComponent implements OnInit {

  public lineaProducto: LineaProductoModel
  constructor(
    private _mant: MantenimientoService,
    private _alerta: AlertaService
  ) {
    this.lineaProducto = new LineaProductoModel(0,'',0,0)
   }

  ngOnInit() {
    var user = JSON.parse(sessionStorage.getItem('gvlog'))
    this.lineaProducto.ModifiedBy = user.UserId
    this.lineaProducto.CreatedBy = user.UserId
  }

  onSubmit() {
    this._mant.saveData('LineaProducto', this.lineaProducto).subscribe(res => {
      this._alerta.setAlerta(res)
    })
  }

}

