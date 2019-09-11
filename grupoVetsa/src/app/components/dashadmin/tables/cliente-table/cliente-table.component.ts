import { Component, OnInit, Input } from '@angular/core';
import { BorrarService } from '../../../../services/borrar.service';
import { CreditoService } from '../../../../services/credito.service';
import { ClienteEfectivoModel } from 'src/app/models/clienteEfectivo.model';

@Component({
  selector: 'cliente-table',
  templateUrl: './cliente-table.component.html',
  styleUrls: ['./cliente-table.component.css']
})
export class ClienteTableComponent implements OnInit {

  @Input() clientes
  public idSelected
  public tabla = 'Cliente'
  public clientesEfectivos: ClienteEfectivoModel
  public clientesSelected = []
  public clienteCredito
  constructor(
    private _borrar: BorrarService,
    private _credito: CreditoService
  ) {
    this.clientesEfectivos = new ClienteEfectivoModel([], 0,0)
  }

  ngOnInit() {
    var user = JSON.parse(sessionStorage.getItem('gvlog'))
    this.clientesEfectivos.CreatedBy = user.UserId
    this.clientesEfectivos.ModifiedBy = user.UserId
  }

  onSelect(id) {
    if (this.clientesSelected.includes(id)) {
      var index = this.clientesSelected.indexOf(id)
      this.clientesSelected.splice(index)
    } else {
      this.clientesSelected.push(id)
    }
    console.log(this.clientesSelected);
  }

  sendEfectivo() {
    this.clientesEfectivos.clientes = this.clientesSelected
    this._credito.sendEfectivo(this.clientesEfectivos).subscribe(res => {
      console.log(res);
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
