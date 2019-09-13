import { Component, OnInit, Input } from '@angular/core';
import { MantenimientoService } from '../../../../services/mantenimiento.service';
import { BorrarService } from '../../../../services/borrar.service';
import { ActivatedRoute } from '@angular/router';
import { UsuariosService } from '../../../../services/usuarios.service';

@Component({
  selector: 'usuario-table',
  templateUrl: './usuario-table.component.html',
  styleUrls: ['./usuario-table.component.css']
})
export class UsuarioTableComponent implements OnInit {

  public usuarios
  public idSelected
  public tabla
  public page
  @Input() getPage
  public disableNext = false
  constructor(
    private _borrar: BorrarService,
    private _usuarios: UsuariosService
  ) {}

  ngOnInit() {
    this._usuarios.getUsuariosTable().subscribe(res => {
      this.usuarios = res.data
      this.page = res.page
    })
  }

  nextPage() {
    this._usuarios.getUsuariosTableNext(this.getPage).subscribe(res => {
      this.usuarios = res.data
      this.page = res.page
      if (this.usuarios.length < 10 || this.usuarios.length == 0) {
        this.disableNext = true
      }
    })
  }

  previousPage() {
    this._usuarios.getUsuariosTablePrevious(this.getPage).subscribe(res => {
      this.usuarios = res.data
      this.page = res.page
      if (this.usuarios.length == 10 || this.usuarios.length == 0) {
        this.disableNext = false
      }
    })
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
