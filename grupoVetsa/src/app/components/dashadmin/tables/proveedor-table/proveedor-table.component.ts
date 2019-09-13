import { Component, OnInit, Input } from '@angular/core';
import { BorrarService } from '../../../../services/borrar.service';
import { ProveedoresService } from '../../../../services/proveedores.service';

@Component({
  selector: 'proveedor-table',
  templateUrl: './proveedor-table.component.html',
  styleUrls: ['./proveedor-table.component.css']
})
export class ProveedorTableComponent implements OnInit {

  public proveedores
  public idSelected
  public tabla
  public page
  @Input() getPage
  public disableNext = false
  constructor(
    private _borrar: BorrarService,
    private _proveedores: ProveedoresService
  ) {}

  ngOnInit() {
    this._proveedores.getProveedoresTable().subscribe(res => {
      this.proveedores = res.data
      this.page = res.page
    })
  }

  nextPage() {
    this._proveedores.getProveedoresTableNext(this.getPage).subscribe(res => {
      this.proveedores = res.data
      this.page = res.page
      if (this.proveedores.length < 10 || this.proveedores.length == 0) {
        this.disableNext = true
      }
    })
  }

  previousPage() {
    this._proveedores.getProveedoresTablePrevious(this.getPage).subscribe(res => {
      this.proveedores = res.data
      this.page = res.page
      if (this.proveedores.length == 10 || this.proveedores.length == 0) {
        this.disableNext = false
      }
    })
  }

  toDelete(id) {
    $('admin-borrar').fadeToggle()
    this._borrar.sendId(id)
  }

}
