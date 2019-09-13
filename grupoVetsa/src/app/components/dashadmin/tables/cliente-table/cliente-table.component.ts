import { Component, OnInit, Input } from '@angular/core';
import { BorrarService } from '../../../../services/borrar.service';
import { CreditoService } from '../../../../services/credito.service';
import { ClienteEfectivoModel } from 'src/app/models/clienteEfectivo.model';
import { ClientesService } from 'src/app/services/clientes.service';

@Component({
  selector: 'cliente-table',
  templateUrl: './cliente-table.component.html',
  styleUrls: ['./cliente-table.component.css']
})
export class ClienteTableComponent implements OnInit {

  public clientes
  public idSelected
  public tabla = 'Cliente'
  public clientesEfectivos: ClienteEfectivoModel
  public clientesSelected = []
  public clienteCredito
  public page
  @Input() getPage
  public disableNext
  constructor(
    private _borrar: BorrarService,
    private _credito: CreditoService,
    private _clientes: ClientesService
  ) {
    this.clientesEfectivos = new ClienteEfectivoModel([], 0,0)
  }

  ngOnInit() {
    var user = JSON.parse(sessionStorage.getItem('gvlog'))
    this.clientesEfectivos.CreatedBy = user.UserId
    this.clientesEfectivos.ModifiedBy = user.UserId

    this._clientes.getClientesTable().subscribe(res => {
      this.clientes = res.data
      this.page = res.page
    })
  }

  nextPage() {
    this._clientes.getClientesTableNext(this.getPage).subscribe(res => {
      this.clientes = res.data
      this.page = res.page
      if (this.clientes.length < 10 || this.clientes.length == 0) {
        this.disableNext = true
      }
    })
  }

  previousPage() {
    this._clientes.getClientesTablePrevious(this.getPage).subscribe(res => {
      this.clientes = res.data
      this.page = res.page
      if (this.clientes.length == 10 || this.clientes.length == 0) {
        this.disableNext = false
      }
    })
  }

  onCredit(id) {
    this.clienteCredito = id
    $("solicitud-credito").fadeToggle()
  }

  toDelete(id) {
    $('admin-borrar').fadeToggle()
    this._borrar.sendId(id)
  }

}
