import { Component, OnInit } from '@angular/core';
import { PrivilegioModel } from 'src/app/models/privilegio.model';
import { MantenimientoService } from '../../../../../services/mantenimiento.service';
import { AlertaService } from '../../../../../services/alerta.service';

@Component({
  selector: 'agregar-privilegio',
  templateUrl: './agregar-privilegio.component.html',
  styleUrls: ['./agregar-privilegio.component.css']
})
export class AgregarPrivilegioComponent implements OnInit {

  public privilegio: PrivilegioModel
  constructor(
    private _mant: MantenimientoService,
    private _alerta: AlertaService
  ) {
    this.privilegio = new PrivilegioModel(0,'',0,0)
   }

  ngOnInit() {
    var user = JSON.parse(sessionStorage.getItem('gvlog'))
    this.privilegio.ModifiedBy = user.UserId
    this.privilegio.CreatedBy = user.UserId
  }

  onSubmit() {
    this._mant.saveData('privilegio', this.privilegio).subscribe(res => {
      this._alerta.setAlerta(res)
    })
  }

}

