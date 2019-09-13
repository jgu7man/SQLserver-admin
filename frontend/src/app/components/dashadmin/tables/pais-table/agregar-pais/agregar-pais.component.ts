import { Component, OnInit } from '@angular/core';
import { PaisModel } from 'src/app/models/pais.model';
import { MantenimientoService } from '../../../../../services/mantenimiento.service';
import { AlertaService } from '../../../../../services/alerta.service';

@Component({
  selector: 'agregar-pais',
  templateUrl: './agregar-pais.component.html',
  styleUrls: ['./agregar-pais.component.css']
})
export class AgregarPaisComponent implements OnInit {

  public pais: PaisModel
  constructor(
    private _mant: MantenimientoService,
    private _alerta: AlertaService
  ) {
    this.pais = new PaisModel(0,'',0,0)
   }

  ngOnInit() {
    var user = JSON.parse(sessionStorage.getItem('gvlog'))
    this.pais.ModifiedBy = user.UserId
    this.pais.CreatedBy = user.UserId
  }

  onSubmit() {
    this._mant.saveData('Pais', this.pais).subscribe(res => {
      this._alerta.setAlerta(res)
    })
  }

}

