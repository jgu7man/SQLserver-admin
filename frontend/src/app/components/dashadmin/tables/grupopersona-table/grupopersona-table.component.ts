import { Component, OnInit, Input } from '@angular/core';
import { BorrarService } from '../../../../services/borrar.service';

@Component({
  selector: 'grupopersona-table',
  templateUrl: './grupopersona-table.component.html',
  styleUrls: ['./grupopersona-table.component.css']
})
export class GrupopersonaTableComponent implements OnInit {

  @Input() gruposPersona
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
