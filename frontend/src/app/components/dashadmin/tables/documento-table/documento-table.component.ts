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

  toDelete(id) {
    $('admin-borrar').fadeToggle()
    // DEJAR LA VARIABLE DE ID SOLAMENTE
    this._borrar.sendId(id)
  }

}
