import { Component, OnInit } from '@angular/core';
import { LineaProductoModel } from 'src/app/models/lineaproducto.model';
import { MantenimientoService } from '../../../../../services/mantenimiento.service';
import { AlertaService } from '../../../../../services/alerta.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'editar-lineaproducto',
  templateUrl: './editar-lineaproducto.component.html',
  styleUrls: ['./editar-lineaproducto.component.css']
})
export class EditarLineaproductoComponent implements OnInit {

  public lineaProducto: LineaProductoModel
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
    this.lineaProducto = new LineaProductoModel(0,'',0,0,)
   }

  ngOnInit() {
    this._mant.selectData(this.ruta, this.id).subscribe(res => {
      this.lineaProducto = res
      console.log(this.lineaProducto);
    })
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
