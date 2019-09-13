import { Component, OnInit, Input } from '@angular/core';
import { BorrarService } from '../../../../services/borrar.service';

@Component({
  selector: 'privilegio-table',
  templateUrl: './privilegio-table.component.html',
  styleUrls: ['./privilegio-table.component.css']
})
export class PrivilegioTableComponent implements OnInit {

  @Input() privilegios
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
