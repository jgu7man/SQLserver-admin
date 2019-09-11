import { Component, OnInit } from '@angular/core';
import { CreditoService } from '../../../../services/credito.service';

@Component({
  selector: 'solicitudes-table',
  templateUrl: './solicitudes-table.component.html',
  styleUrls: ['./solicitudes-table.component.css']
})
export class SolicitudesTableComponent implements OnInit {

  public creditos
  public efectivos
  public pageCredito
  public disableCredito
  public pageEfectivo
  public disableEfectivo
  constructor(
    private _solicitud: CreditoService
  ) { }

  ngOnInit() {
    this.getTablas()
  }

  getTablas() {
    this._solicitud.getTabla('Solicitud_Credito').subscribe(res => {
      this.creditos = res.data;
      console.log(res);
    })
    this._solicitud.getTabla('Solicitud_Efectivo').subscribe(res => {
      this.efectivos = res.data;
      console.log(res);
    })
  }

  nextPageCredito( page: number) {
    this._solicitud.getNextPage('Solicitud_Credito', page).subscribe(res => {
          this.creditos = res.data
      this.pageCredito = res.page
      if (this.creditos.length < 10 || this.creditos.length == 0) {
        this.disableCredito = true
      }
        })
  }

  nextPageEfectivo( page: number) {
    this._solicitud.getNextPage('Solicitud_Efectivo', page).subscribe(res => {
          this.efectivos = res.data
      this.pageEfectivo = res.page
      if (this.efectivos.length < 10 || this.efectivos.length == 0) {
        this.disableEfectivo = true
      }
        })
  }

  previusPageCredito(page: number) {
    this._solicitud.getpreviusPage('Solicitud_Credito', page).subscribe(res => {
          this.creditos = res.data
      this.pageCredito = res.page
      if (this.creditos.length == 10 || this.creditos.length == 0) {
        this.disableCredito = false
      }
        })
  }

  previusPageEfectivo(page: number) {
    this._solicitud.getpreviusPage('Solicitud_Efectivo', page).subscribe(res => {
          this.efectivos = res.data
      this.pageEfectivo = res.page
      if (this.efectivos.length == 10 || this.efectivos.length == 0) {
        this.disableEfectivo = false
      }
        })
  }

}
