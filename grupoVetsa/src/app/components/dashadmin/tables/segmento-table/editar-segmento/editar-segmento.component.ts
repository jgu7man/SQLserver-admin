import { Component, OnInit } from '@angular/core';
import { SegmentoModel } from 'src/app/models/segmento.model';
import { MantenimientoService } from '../../../../../services/mantenimiento.service';
import { AlertaService } from '../../../../../services/alerta.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'editar-segmento',
  templateUrl: './editar-segmento.component.html',
  styleUrls: ['./editar-segmento.component.css']
})
export class EditarSegmentoComponent implements OnInit {

  public segmento: SegmentoModel;
  public ruta;
  public id;
  constructor(
    // tslint:disable-next-line:variable-name
    private _mant: MantenimientoService,
    // tslint:disable-next-line:variable-name
    private _ruta: ActivatedRoute,
    // tslint:disable-next-line:variable-name
    private _alerta: AlertaService
  ) {
    this._ruta.params.subscribe(ruta => {
      this.ruta = ruta['string'];
      this.id = ruta['id'];
    });
    this.segmento = new SegmentoModel(0, '', 0, 0, );
   }

  ngOnInit() {
    this._mant.selectData(this.ruta, this.id).subscribe(res => {
      this.segmento = res;
      console.log(this.segmento);
    });
    // tslint:disable-next-line:prefer-const
    let user = JSON.parse(sessionStorage.getItem('gvlog'));
    this.segmento.ModifiedBy = user.UserId;
    this.segmento.CreatedBy = user.UserId;
  }

  onSubmit() {
    this._mant.saveData('Segmento', this.segmento).subscribe(res => {
      this._alerta.setAlerta(res);
    });
  }
  onEdit() {
    this._mant.updateData(this.ruta, this.segmento).subscribe(res => {
      console.log(res);
      this._alerta.setAlerta(res);
    });
  }
}
