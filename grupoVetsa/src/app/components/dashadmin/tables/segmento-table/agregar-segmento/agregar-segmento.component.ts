import { Component, OnInit } from '@angular/core';
import { SegmentoModel } from 'src/app/models/segmento.model';
import { MantenimientoService } from '../../../../../services/mantenimiento.service';
import { AlertaService } from '../../../../../services/alerta.service';

@Component({
  selector: 'agregar-segmento',
  templateUrl: './agregar-segmento.component.html',
  styleUrls: ['./agregar-segmento.component.css']
})
export class AgregarSegmentoComponent implements OnInit {

  public segmento: SegmentoModel
  constructor(
    private _mant: MantenimientoService,
    private _alerta: AlertaService
  ) {
    this.segmento = new SegmentoModel(0,'',0,0)
   }

  ngOnInit() {
    var user = JSON.parse(sessionStorage.getItem('gvlog'))
    this.segmento.ModifiedBy = user.UserId
    this.segmento.CreatedBy = user.UserId
  }

  onSubmit() {
    this._mant.saveData('Segmento', this.segmento).subscribe(res => {
      this._alerta.setAlerta(res)
    })
  }

}
