import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'admin-add',
  templateUrl: './admin-add.component.html',
  styleUrls: ['./admin-add.component.css']
})
export class AdminAddComponent implements OnInit {

  public ruta
  constructor(
    private _ruta: ActivatedRoute
  ) {
    this._ruta.params.subscribe(ruta => {
      this.ruta = ruta['string']
    })
   }

  ngOnInit() {
  }

}
