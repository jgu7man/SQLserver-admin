import { Component, OnInit } from '@angular/core';
import { PrivilegioModel } from 'src/app/models/privilegio.model';
import { MantenimientoService } from '../../../../../services/mantenimiento.service';
import { AlertaService } from '../../../../../services/alerta.service';
import { Router } from '@angular/router';
import { Rol_PrivilegioModel } from '../../../../../models/rol-privilegio.model';

@Component({
  selector: 'agregar-privilegio',
  templateUrl: './agregar-privilegio.component.html',
  styleUrls: ['./agregar-privilegio.component.css']
})
export class AgregarPrivilegioComponent implements OnInit {

  public privilegio: Rol_PrivilegioModel
  public privilegios = []
  public roles = []
  constructor(
    private _mant: MantenimientoService,
    private _alerta: AlertaService,
    private router: Router
  ) {
    this.privilegio = new Rol_PrivilegioModel(0,0,0,0,0)
   }

  ngOnInit() {
    var user = JSON.parse(sessionStorage.getItem('gvlog'))
    this.privilegio.ModifiedBy = user.UserId
    this.privilegio.CreatedBy = user.UserId

    this._mant.getData('Rol').subscribe(res => {
      this.roles = res
    })
    this._mant.getData('Privilegio').subscribe(res => {
      this.privilegios = res
    })
  }

  onSubmit() {
    this.privilegio.PrivilegioId = +this.privilegio.PrivilegioId
    this.privilegio.RolId = +this.privilegio.RolId
    this._mant.saveData('Rol_Privilegio', this.privilegio).subscribe(res => {
      this._alerta.setAlerta(res)
      this.router.navigate(['/dashadmin/mantenimiento/Rol_Privilegio'])
    })
  }

}