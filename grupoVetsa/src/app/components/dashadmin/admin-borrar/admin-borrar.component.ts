import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { BorrarService } from '../../../services/borrar.service';
import { MantenimientoService } from '../../../services/mantenimiento.service';
import { AlertaService } from '../../../services/alerta.service';
import { ActivatedRoute } from '@angular/router';

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
    private _ruta: ActivatedRoute
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
    console.log(this.tabla,' - ', this.idToDel );
    this._mant.deleteData(this.tabla, this.idToDel).subscribe(res => {
      $('admin-borrar').fadeToggle()
      this.reload.emit(true)
      this._alerta.setAlerta(res)
    })
  }

}
