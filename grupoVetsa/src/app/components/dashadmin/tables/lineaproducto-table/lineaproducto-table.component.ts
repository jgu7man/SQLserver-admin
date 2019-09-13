import { Component, OnInit, Input } from '@angular/core';
import { BorrarService } from '../../../../services/borrar.service';

@Component({
  selector: 'lineaproducto-table',
  templateUrl: './lineaproducto-table.component.html',
  styleUrls: ['./lineaproducto-table.component.css']
})
export class LineaproductoTableComponent implements OnInit {

  @Input() lineasProducto
  public idSelected
  public tabla
  constructor(
    private _borrar: BorrarService,
  ) {}

  ngOnInit() {
    
  }

  toDelete(id) {
    $('admin-borrar').fadeToggle()
    this._borrar.sendId(id)
  }

}
