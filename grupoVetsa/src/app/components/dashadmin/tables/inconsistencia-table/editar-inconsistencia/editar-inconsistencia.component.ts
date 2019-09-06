import { Component, OnInit } from '@angular/core';
import { InconsistenciaModel } from 'src/app/models/inconsistencia.model';
import { MantenimientoService } from '../../../../../services/mantenimiento.service';
import { AlertaService } from '../../../../../services/alerta.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'editar-inconsistencia',
  templateUrl: './editar-inconsistencia.component.html',
  styleUrls: ['./editar-inconsistencia.component.css']
})
export class EditarInconsistenciaComponent implements OnInit {

  public inconsistencia: InconsistenciaModel
  public Cliente_items = []
  public Proveedor_items = []
  public Documento_items = []
  public Categoria_items = []
  public day
  public month
  public year
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
    this.inconsistencia = new InconsistenciaModel(0,'','',0,'',0,0,'',0,0,0)
   }

  ngOnInit() {
    this.getTablas()
    this._mant.selectData(this.ruta, this.id).subscribe(res => {
      this.inconsistencia = res
      console.log(this.inconsistencia);
    })
    var user = JSON.parse(sessionStorage.getItem('gvlog'))
    this.inconsistencia.ModifiedBy = user.UserId
    this.inconsistencia.CreatedBy = user.UserId
  }

  getTablas() {
    this._mant.getData('Cliente').subscribe(res => { this.Cliente_items = res })
    this._mant.getData('Proveedor').subscribe(res => { this.Proveedor_items = res })
    this._mant.getData('Documento').subscribe(res => { this.Documento_items = res })
    this._mant.getData('Categoria').subscribe( res => { this.Categoria_items = res })
  }

  setDate() {
    this.inconsistencia.FechaRecepcion = `${this.year}-${this.month}-${this.day}`
  }

  onSubmit() {
    this.setDate
    this._mant.saveData('Inconsistencia', this.inconsistencia).subscribe(res => {
      this._alerta.setAlerta(res)
    })
  }

  

}
