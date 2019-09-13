import { Component, OnInit, Input } from '@angular/core';
import { BorrarService } from '../../../../services/borrar.service';

@Component({
  selector: 'segmento-table',
  templateUrl: './segmento-table.component.html',
  styleUrls: ['./segmento-table.component.css']
})
export class SegmentoTableComponent implements OnInit {

  @Input() segmentos
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
