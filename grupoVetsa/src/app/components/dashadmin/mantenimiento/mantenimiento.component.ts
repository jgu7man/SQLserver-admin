import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MantenimientoService } from '../../../services/mantenimiento.service';

@Component({
  selector: 'mantenimiento',
  templateUrl: './mantenimiento.component.html',
  styleUrls: ['./mantenimiento.component.css']
})
export class MantenimientoComponent implements OnInit {

  public ruta: string
  constructor(
    private _ruta: ActivatedRoute,
    private _mant: MantenimientoService,
  ) {
    this._ruta.params.subscribe(ruta => {
      this.ruta = ruta['string']
    })
   }

  ngOnInit() {
    
  }

}
