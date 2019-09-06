import { Component, OnInit, Input } from '@angular/core';
import { BorrarService } from '../../../../services/borrar.service';

@Component({
  selector: 'inconsistencia-table',
  templateUrl: './inconsistencia-table.component.html',
  styleUrls: ['./inconsistencia-table.component.css']
})
export class InconsistenciaTableComponent implements OnInit {

  @Input() inconsistencias
  public idSelected
  public tabla
  constructor(
    private _borrar: BorrarService,
  ) {}

  ngOnInit() {
    
  }

  onChangeRol(id) {
    $('change-rol').fadeToggle()
    this.idSelected = id
  }

  toDelete(id) {
    $('admin-borrar').fadeToggle()
    this._borrar.sendId(this.tabla, id)
  }

}
