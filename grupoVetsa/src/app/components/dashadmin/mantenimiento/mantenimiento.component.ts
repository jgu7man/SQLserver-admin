import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MantenimientoService } from '../../../services/mantenimiento.service';
import { SideBarService } from '../../../services/sideBar.service';
import { SideBarModel } from 'src/app/models/sideBar.model';

@Component({
  selector: 'mantenimiento',
  templateUrl: './mantenimiento.component.html',
  styleUrls: ['./mantenimiento.component.css']
})
export class MantenimientoComponent implements OnInit {

  public ruta: string
  public listaTablas = []
  public tabla: SideBarModel
  public response: any
  constructor(
    private _ruta: ActivatedRoute,
    private _sidebar: SideBarService,
    private _mant: MantenimientoService,
  ) {
    this.tabla = new SideBarModel('','')
    this.listaTablas = this._sidebar.getList()
    this._ruta.params.subscribe(ruta => {
      this.ruta = ruta['string']
      console.log(this.ruta);
      if (this.ruta) {
        this.getTablaTitle()
        this._mant.getData(this.ruta).subscribe(res => {
          this.response = res
        })
      }
    })
   }

  ngOnInit() {
  }

  getTablaTitle() {
    this.tabla = this.listaTablas.find(tabla => tabla.key === this.ruta)
  }

}
