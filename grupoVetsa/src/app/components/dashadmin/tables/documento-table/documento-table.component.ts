import { Component, OnInit, Input } from '@angular/core';
import { BorrarService } from '../../../../services/borrar.service';

@Component({
  selector: 'documento-table',
  templateUrl: './documento-table.component.html',
  styleUrls: ['./documento-table.component.css']
})
export class DocumentoTableComponent implements OnInit {

  @Input() documentos
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
