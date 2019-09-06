import { Component, OnInit, Input } from '@angular/core';
import { BorrarService } from '../../../../services/borrar.service';

@Component({
  selector: 'cliente-table',
  templateUrl: './cliente-table.component.html',
  styleUrls: ['./cliente-table.component.css']
})
export class ClienteTableComponent implements OnInit {

  @Input() clientes
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
