import { Component, OnInit } from '@angular/core';
import { PaisModel } from 'src/app/models/pais.model';
import { MantenimientoService } from '../../../../../services/mantenimiento.service';
import { AlertaService } from '../../../../../services/alerta.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'editar-pais',
  templateUrl: './editar-pais.component.html',
  styleUrls: ['./editar-pais.component.css']
})
export class EditarPaisComponent implements OnInit {

  public pais: PaisModel;
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
    this.pais = new PaisModel(0, '', 0, 0 , );
   }

  ngOnInit() {
    this._mant.selectData(this.ruta, this.id).subscribe(res => {
      this.pais = res;
      console.log(this.pais);
    });
    const user = JSON.parse(sessionStorage.getItem('gvlog'));
    this.pais.ModifiedBy = user.UserId;
    this.pais.CreatedBy = user.UserId;
  }

  onSubmit() {
    this._mant.saveData('Pais', this.pais).subscribe(res => {
      this._alerta.setAlerta(res);
    });
  }
  onEdit() {
    this._mant.updateData(this.ruta, this.pais).subscribe(res => {
      console.log(res);
      this._alerta.setAlerta(res);
    });
  }

}
