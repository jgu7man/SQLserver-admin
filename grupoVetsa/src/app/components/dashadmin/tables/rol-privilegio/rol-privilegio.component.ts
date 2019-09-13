import { Component, OnInit, Input } from '@angular/core';
import { BorrarService } from '../../../../services/borrar.service';
import { PermisosService } from '../../../../services/permisos.service';

@Component({
  selector: 'rol-privilegio',
  templateUrl: './rol-privilegio.component.html',
  styleUrls: ['./rol-privilegio.component.css']
})
export class RolPrivilegioComponent implements OnInit {

  public roles_privilegios = []
  public rolesGeted
  public privilegios
  public idSelected
  public tabla
  constructor(
    private _borrar: BorrarService,
    private _permisos: PermisosService
  ) {}

   ngOnInit() {
     this._permisos.getPermisosTable().subscribe(res => {
       console.log(res);
       this.roles_privilegios = res
    })
  }

  toDelete(id) {
    $('admin-borrar').fadeToggle()
    this._borrar.sendId(id)
  }

}
