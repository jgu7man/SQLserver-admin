import { Component, OnInit } from '@angular/core';
import { CategoriaModel } from 'src/app/models/categoria.model';
import { MantenimientoService } from '../../../../../services/mantenimiento.service';
import { AlertaService } from '../../../../../services/alerta.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'editar-categoria',
  templateUrl: './editar-categoria.component.html',
  styleUrls: ['./editar-categoria.component.css']
})
export class EditarCategoriaComponent implements OnInit {

  public categoria: CategoriaModel;
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
    this.categoria = new CategoriaModel(0, '', 0, 0, );
   }

  ngOnInit() {
    this._mant.selectData(this.ruta, this.id).subscribe(res => {
      this.categoria = res;
      console.log(this.categoria);
    });
    // tslint:disable-next-line:prefer-const
    let user = JSON.parse(sessionStorage.getItem('gvlog'));
    this.categoria.ModifiedBy = user.UserId;
    this.categoria.CreatedBy = user.UserId;
  }

  onSubmit() {
    this._mant.saveData('Categoria', this.categoria).subscribe(res => {
      this._alerta.setAlerta(res);
    });
  }
  onEdit() {
    this._mant.updateData(this.ruta, this.categoria).subscribe(res => {
      console.log(res);
      this._alerta.setAlerta(res);
    });
  }

}
