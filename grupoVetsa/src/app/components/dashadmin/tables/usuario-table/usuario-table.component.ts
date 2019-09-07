import { Component, OnInit, Input } from '@angular/core';
import { MantenimientoService } from '../../../../services/mantenimiento.service';
import { BorrarService } from '../../../../services/borrar.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'usuario-table',
  templateUrl: './usuario-table.component.html',
  styleUrls: ['./usuario-table.component.css']
})
export class UsuarioTableComponent implements OnInit {

  @Input() usuarios: any;
  public idSelected;
  public tabla;
  constructor(
    // tslint:disable-next-line:variable-name
    private _borrar: BorrarService,
  ) {}

  ngOnInit() {
  }

  onChangeRol(id) {
    $('change-rol').fadeToggle();
    this.idSelected = id;
  }

  toDelete(id) {
    $('admin-borrar').fadeToggle();
    this._borrar.sendId(this.tabla, id);
  }

}
