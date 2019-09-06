import { Injectable, Output, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BorrarService {

  @Output() toBorrar = new EventEmitter()
  constructor() { }

  sendId(tabla, id) {
    this.toBorrar.emit({tabla: tabla, id: id})
  }
}
