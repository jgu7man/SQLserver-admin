import { Component, OnInit } from '@angular/core';
import { AlertaModel } from 'src/app/models/alerta.model'
import { AlertaService } from '../../services/alerta.service';

@Component({
  selector: 'alerta',
  templateUrl: './alerta.component.html',
  styleUrls: ['./alerta.component.css']
})
export class AlertaComponent implements OnInit {

  alerta: AlertaModel
  constructor(
    private _alerta: AlertaService
  ) {
    this.alerta = new AlertaModel('','')
   }

  ngOnInit() {
    this._alerta.alerta.subscribe(res => {
      this.alerta.mensaje = res.mensaje
      this.alerta.tipo = res.tipo
    })
  }

  close() {
    this.alerta.mensaje = ''
    $("#alerta").removeClass('warning')
    $("#alerta").removeClass('success')
  }

}
