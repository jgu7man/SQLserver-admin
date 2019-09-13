import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SideBarService } from '../../../services/sideBar.service';
import { SideBarModel } from '../../../models/sideBar.model';

@Component({
  selector: 'admin-add',
  templateUrl: './admin-add.component.html',
  styleUrls: ['./admin-add.component.css']
})
export class AdminAddComponent implements OnInit {

  public ruta
  public listaTablas
  public tabla: SideBarModel
  constructor(
    private _ruta: ActivatedRoute,
    private _sidebar: SideBarService
  ) {
    this.listaTablas = this._sidebar.getFullList()
    this._ruta.params.subscribe(ruta => {
      this.ruta = ruta['string']
      if (this.ruta) {
        this.getTablaTitle()
      }
      this.getTablaTitle()
    })
    this.tabla = new SideBarModel('','')
   }

  ngOnInit() {
  }

  getTablaTitle() {
    this.tabla = this.listaTablas.find(tabla => tabla.key === this.ruta)
  }

}
