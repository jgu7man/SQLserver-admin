import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MantenimientoService } from '../../../services/mantenimiento.service';
import { SideBarService } from '../../../services/sideBar.service';
import { SideBarModel } from '../../../models/sideBar.model';

@Component({
  selector: 'admin-editar',
  templateUrl: './admin-editar.component.html',
  styleUrls: ['./admin-editar.component.css']
})
export class AdminEditarComponent implements OnInit {

  public ruta
  public id
  public response
  public listaTablas
  public tabla: SideBarModel
  constructor(
    private _ruta: ActivatedRoute,
    private _mant: MantenimientoService,
    private _sidebar: SideBarService
  ) {
    this.listaTablas = this._sidebar.getList()
    this._ruta.params.subscribe(ruta => {
      this.ruta = ruta['string']
      this.id = ruta['id']
      
    })
    this.tabla = new SideBarModel('','')
   }

  ngOnInit() {
    this._mant.selectData(this.ruta, this.id).subscribe(res => {
      this.response = res
    })
    this.getTablaTitle()
  }

  getTablaTitle() {
    this.tabla = this.listaTablas.find(tabla => tabla.key === this.ruta)
  }

}
