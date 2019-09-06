import { Component, OnInit, Input } from '@angular/core';
import { BorrarService } from '../../../../services/borrar.service';

@Component({
  selector: 'tipofiscal-table',
  templateUrl: './tipofiscal-table.component.html',
  styleUrls: ['./tipofiscal-table.component.css']
})
export class TipofiscalTableComponent implements OnInit {

  @Input() tiposFiscales
  public idSelected
  public tabla
  constructor(
    private _borrar: BorrarService,
  ) {}

  ngOnInit() {
    
  }

  

  toDelete(id) {
    $('admin-borrar').fadeToggle()
    this._borrar.sendId(this.tabla, id)
  }

}
