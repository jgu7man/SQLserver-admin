import { Component, OnInit, Input } from '@angular/core';
import { MantenimientoService } from '../../../../services/mantenimiento.service';
import { BorrarService } from '../../../../services/borrar.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'usuario-table',
  templateUrl: './usuario-table.component.html',
  styleUrls: ['./usuario-table.component.css']
})
export class UsuarioTableComponent implements OnInit {

  @Input() usuarios
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
