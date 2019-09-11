import { Component, OnInit } from '@angular/core';
import { InconsistenciaModel } from '../../../../../models/inconsistencia.model';
import { MantenimientoService } from '../../../../../services/mantenimiento.service';
import { AlertaService } from '../../../../../services/alerta.service';
import { Router } from '@angular/router';

@Component({
  selector: 'agregar-inconsistencia',
  templateUrl: './agregar-inconsistencia.component.html',
  styleUrls: ['./agregar-inconsistencia.component.css']
})
export class AgregarInconsistenciaComponent implements OnInit {

  public Inconsistencia: InconsistenciaModel
  public Cliente_items = []
  public Proveedor_items = []
  public Documento_items = []
  public Categoria_items = []
  public day
  public month
  public year
  constructor(
    private _mant: MantenimientoService,
    private _alerta: AlertaService,
    private router: Router
  ) {
    this.Inconsistencia = new InconsistenciaModel(0,'','',0,'',0,0,'',0,0,0)
   }

  ngOnInit() {
    var user = JSON.parse(sessionStorage.getItem('gvlog'))
    this.Inconsistencia.CreatedBy = user.UserId
    this.Inconsistencia.ModifiedBy = user.UserId
    this.getTablas()
  }

  getTablas() {
    this._mant.getData('Cliente').subscribe(res => { this.Cliente_items = res; console.log(res); })
    this._mant.getData('Proveedor').subscribe(res => { this.Proveedor_items = res })
    this._mant.getData('Documento').subscribe(res => { this.Documento_items = res })
    this._mant.getData('Categoria').subscribe( res => { this.Categoria_items = res })
  }


  onSubmit() {
    this.Inconsistencia.Cliente = +this.Inconsistencia.Cliente
    this.Inconsistencia.Categoria = +this.Inconsistencia.Categoria
    this.Inconsistencia.Proveedor = +this.Inconsistencia.Proveedor
    this.Inconsistencia.Documento = +this.Inconsistencia.Documento
    this._mant.saveData('Inconsistencia', this.Inconsistencia).subscribe(res => {
      this._alerta.setAlerta(res)
      this.router.navigate(['dashadmin/mantenimiento/Inconsistencia'])
    })
  }

}
