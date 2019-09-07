import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MantenimientoService } from '../../../services/mantenimiento.service';
import { SideBarService } from '../../../services/sideBar.service';
import { SideBarModel } from 'src/app/models/sideBar.model';
import { BorrarService } from '../../../services/borrar.service';

@Component({
  selector: 'mantenimiento',
  templateUrl: './mantenimiento.component.html',
  styleUrls: ['./mantenimiento.component.css']
})
export class MantenimientoComponent implements OnInit, OnChanges {

  public ruta: string
  public listaTablas = []
  public tabla: SideBarModel
  public response: any
  public reload: boolean = false
  constructor(
    private _ruta: ActivatedRoute,
    private _sidebar: SideBarService,
    private _mant: MantenimientoService,
    private _borrar: BorrarService
  ) {
    this.tabla = new SideBarModel('', '')
    
    this.listaTablas = this._sidebar.getList()
    this._ruta.params.subscribe(ruta => {
      this.ruta = ruta['string']
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

  ngOnChanges(changes: SimpleChanges): void {
    
    
    console.log(changes);
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
