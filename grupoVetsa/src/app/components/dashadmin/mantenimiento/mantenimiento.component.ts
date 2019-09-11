import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MantenimientoService } from '../../../services/mantenimiento.service';
import { SideBarService } from '../../../services/sideBar.service';
import { SideBarModel } from 'src/app/models/sideBar.model';
import { BorrarService } from '../../../services/borrar.service';
import { Subject } from 'rxjs';

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
  public reload: boolean = false
  public page
  public disableNext = false
  constructor(
    private _ruta: ActivatedRoute,
    private _sidebar: SideBarService,
    private _mant: MantenimientoService,
    private _borrar: BorrarService,
    private router: Router
  ) {
    this.tabla = new SideBarModel('', '')

    this.listaTablas = this._sidebar.getFullList()

    this._ruta.params.subscribe(ruta => {
      this.ruta = ruta['string']
      if (this.ruta) {
        this.getTablaTitle()
        this.getDataTable(this.ruta)
      }
    })
   }

  ngOnInit() {
    
  }

  getDataTable(ruta) {
    this._mant.getTabla(ruta).subscribe(res => {
      console.log(res.data);
          this.response = res.data
          this.page = res.page
        })
  }


  nextPage(page: number) {
    this._mant.getNextPage(this.ruta, page).subscribe(res => {
          this.response = res.data
      this.page = res.page
      if (this.response.length < 10 || this.response.length == 0) {
        this.disableNext = true
      }
        })
  }

  previusPage(page: number) {
    this._mant.getpreviusPage(this.ruta, page).subscribe(res => {
          this.response = res.data
      this.page = res.page
      if (this.response.length == 10 || this.response.length == 0) {
        this.disableNext = false
      }
        })
  }
  

  reloaded(e) {
        this._mant.getData(this.ruta).subscribe(res => {
            this.response = res
      })
  }

  getTablaTitle() {
    this.tabla = this.listaTablas.find(tabla => tabla.key === this.ruta )
    if (!this.tabla) {
      this.tabla = new SideBarModel('','')
    }
  }

}
