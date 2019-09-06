import { Component, OnInit } from '@angular/core';
import { SegmentoModel } from 'src/app/models/segmento.model';
import { MantenimientoService } from '../../../../../services/mantenimiento.service';
import { AlertaService } from '../../../../../services/alerta.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'editar-segmento',
  templateUrl: './editar-segmento.component.html',
  styleUrls: ['./editar-segmento.component.css']
})
export class EditarSegmentoComponent implements OnInit {

  public segmento: SegmentoModel
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
    this.segmento = new SegmentoModel(0,'',0,0,)
   }

  ngOnInit() {
    this._mant.selectData(this.ruta, this.id).subscribe(res => {
      this.segmento = res
      console.log(this.segmento);
    })
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
