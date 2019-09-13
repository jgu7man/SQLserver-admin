import { Component, OnInit } from '@angular/core';
import { PrivilegioModel } from 'src/app/models/privilegio.model';
import { MantenimientoService } from '../../../../../services/mantenimiento.service';
import { AlertaService } from '../../../../../services/alerta.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'editar-privilegio',
  templateUrl: './editar-privilegio.component.html',
  styleUrls: ['./editar-privilegio.component.css']
})
export class EditarPrivilegioComponent implements OnInit {

  public privilegio: PrivilegioModel
  public ruta
  public id
  constructor(
    private _mant: MantenimientoService,
    private _ruta: ActivatedRoute,
    private _alerta: AlertaService
  ) {
    this._ruta.params.subscribe(ruta => {
      this.ruta = ruta['string']
      this.id = ruta['id']
    })
    this.privilegio = new PrivilegioModel(0,'',0,0,)
   }

  ngOnInit() {
    this._mant.selectData(this.ruta, this.id).subscribe(res => {
      this.privilegio = res
    })
    var user = JSON.parse(sessionStorage.getItem('gvlog'))
    this.privilegio.ModifiedBy = user.UserId
    this.privilegio.CreatedBy = user.UserId
  }

  onSubmit() {
    this._mant.saveData('Privilegio', this.privilegio).subscribe(res => {
      this._alerta.setAlerta(res)
    })
  }

  

}
