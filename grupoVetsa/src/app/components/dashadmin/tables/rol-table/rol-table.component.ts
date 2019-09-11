import { Component, OnInit, Input } from '@angular/core';
import { BorrarService } from '../../../../services/borrar.service';

@Component({
  selector: 'rol-table',
  templateUrl: './rol-table.component.html',
  styleUrls: ['./rol-table.component.css']
})
export class RolTableComponent implements OnInit {

  @Input() roles
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
    this._borrar.sendId(id)
  }

}
