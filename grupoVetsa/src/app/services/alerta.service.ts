import { Injectable, Output, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AlertaService {

  @Output() alerta = new EventEmitter()
  constructor() { }

  setAlerta(object) {
    this.alerta.emit(object)
  }
}
