import { Component, OnInit, Input } from '@angular/core';
import { BorrarService } from '../../../../services/borrar.service';
import { InconsistenciasService } from '../../../../services/inconsistencias.service';

@Component({
  selector: 'inconsistencia-table',
  templateUrl: './inconsistencia-table.component.html',
  styleUrls: ['./inconsistencia-table.component.css']
})
export class InconsistenciaTableComponent implements OnInit {

  public inconsistencias
  public idSelected
  public tabla
  public page
  @Input() getPage
  public disableNext = false
  constructor(
    private _borrar: BorrarService,
    private _inconsistencias: InconsistenciasService
  ) {}

  ngOnInit() {
    this._inconsistencias.getInconsistenciasTable().subscribe(res => {
      this.inconsistencias = res.data
      this.page = res.page
    })
  }

  nextPage() {
    this._inconsistencias.getInconsistenciasTableNext(this.getPage).subscribe(res => {
      this.inconsistencias = res.data
      this.page = res.page
      if (this.inconsistencias.length < 10 || this.inconsistencias.length == 0) {
        this.disableNext = true
      }
    })
  }

  previousPage() {
    this._inconsistencias.getInconsistenciasTablePrevious(this.getPage).subscribe(res => {
      this.inconsistencias = res.data
      this.page = res.page
      if (this.inconsistencias.length == 10 || this.inconsistencias.length == 0) {
        this.disableNext = false
      }
    })
  }

  toDelete(id) {
    $('admin-borrar').fadeToggle()
    this._borrar.sendId(id)
  }

}
