import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { BorrarService } from '../../../services/borrar.service';
import { MantenimientoService } from '../../../services/mantenimiento.service';
import { AlertaService } from '../../../services/alerta.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RefreshService } from '../../../services/refresh.service';

@Component({
  selector: 'admin-borrar',
  templateUrl: './admin-borrar.component.html',
  styleUrls: ['./admin-borrar.component.css']
})
export class AdminBorrarComponent implements OnInit {

  public idToDel
  public tabla
  @Output() reload = new EventEmitter()
  constructor(
    private _borrar: BorrarService,
    private _mant: MantenimientoService,
    private _alerta: AlertaService,
    private _ruta: ActivatedRoute,
    private _refresh: RefreshService
  ) { }

  ngOnInit() {
    this._ruta.params.subscribe(params => {
      this.tabla = params['string']
    })
    this._borrar.toBorrar.subscribe(res => {
      this.idToDel = res.id
      console.log(res);
    })
  }

  onClose() {
    $("admin-borrar").fadeToggle()
  }

  onSubmit() {
    this._mant.deleteData(this.tabla, this.idToDel).subscribe(res => {
      $('admin-borrar').fadeToggle()
      this._alerta.setAlerta(res)
      this._refresh.toRefresh()
    })
  }

}
