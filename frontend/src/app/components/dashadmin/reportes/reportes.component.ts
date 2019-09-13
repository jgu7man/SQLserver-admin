import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css']
})
export class ReportesComponent implements OnInit {

  public ruta: string
  constructor(
    private _ruta: ActivatedRoute
  ) { }

  ngOnInit() {
    this._ruta.params.subscribe(ruta => {
      this.ruta = ruta['string']
    })
  }

}
