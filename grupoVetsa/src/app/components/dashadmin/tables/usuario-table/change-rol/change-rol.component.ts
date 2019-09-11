import { Component, OnInit, Input } from '@angular/core';
import { MantenimientoService } from '../../../../../services/mantenimiento.service';
import { Rol_UserModel } from 'src/app/models/rol_user.model';

@Component({
  selector: 'change-rol',
  templateUrl: './change-rol.component.html',
  styleUrls: ['./change-rol.component.css']
})
export class ChangeRolComponent implements OnInit {

  public roles = []
  @Input() UserId
  public rol: Rol_UserModel
  constructor(
    private _mant: MantenimientoService
  ) {
    this.rol = new Rol_UserModel(0, 0, 0, 0)
    
   }

  ngOnInit() {
    this._mant.getData('Rol').subscribe(res => {
      this.roles = res
      console.log(this.roles);
    })
  }

  onClose() {
    $("change-rol").toggle()
  }

  onSubmit() {
    var user = JSON.parse(sessionStorage.getItem('gvlog'))
    this.rol.CreatedBy = user.UserId
    this.rol.ModifiedBy = user.UserId
    this.rol.UserId = this.UserId
    this.rol.RolId = +this.rol.RolId
    this._mant.updateData('User_Rol', this.rol).subscribe(res => {
      console.log(res);
      $("change-rol").toggle()
    })      
  }
}
