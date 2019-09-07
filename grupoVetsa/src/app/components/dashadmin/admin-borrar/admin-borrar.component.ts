import { Component, OnInit } from '@angular/core';
import { BorrarService } from '../../../services/borrar.service';
import { MantenimientoService } from '../../../services/mantenimiento.service';
import { AlertaService } from '../../../services/alerta.service';

@Component({
  selector: 'admin-borrar',
  templateUrl: './admin-borrar.component.html',
  styleUrls: ['./admin-borrar.component.css']
})
export class AdminBorrarComponent implements OnInit {

  public idToDel
  public tabla
  constructor(
    private _borrar: BorrarService,
    private _mant: MantenimientoService,
    private _alerta: AlertaService
  ) { }

  ngOnInit() {
    this._borrar.toBorrar.subscribe(res => {
      this.idToDel = res.id
      this.tabla = res.tabla
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
    })
  }

}
