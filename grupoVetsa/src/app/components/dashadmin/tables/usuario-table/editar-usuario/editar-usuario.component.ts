import { Component, OnInit, } from '@angular/core';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { ActivatedRoute } from '@angular/router';
import { MantenimientoService } from '../../../../../services/mantenimiento.service';
import { AlertaService } from '../../../../../services/alerta.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.css']
})
export class EditarUsuarioComponent implements OnInit {

  public ruta;
  public id;
  public usuario: UsuarioModel;
  constructor(
    // tslint:disable-next-line:variable-name
    private _ruta: ActivatedRoute,
    // tslint:disable-next-line:variable-name
    private _mant: MantenimientoService,
    // tslint:disable-next-line:variable-name
    private _alerta: AlertaService
  ) {
    this._ruta.params.subscribe(ruta => {
      this.ruta = ruta['string'];
      this.id = ruta['id'];
    });
    this.usuario = new UsuarioModel(0, 0, '', '', '', '', 0, 0);
   }

  ngOnInit() {
    this._mant.selectData(this.ruta, this.id).subscribe(res => {
      this.usuario = res;
      console.log(this.usuario);
    });
  }

  onEdit() {
    this._mant.updateData(this.ruta, this.usuario).subscribe(res => {
      console.log(res);
      this._alerta.setAlerta(res);
    });
  }

}
