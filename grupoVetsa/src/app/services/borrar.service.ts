import { Injectable, Output, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BorrarService {

  @Output() toBorrar = new EventEmitter()
  
  constructor() { }

  sendId(id) {
    this.toBorrar.emit({ id: id })
    
  }

}
