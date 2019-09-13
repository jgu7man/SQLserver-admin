import { Component, OnInit, Input } from '@angular/core';
import { BorrarService } from '../../../../services/borrar.service';

@Component({
  selector: 'tipoindustria-table',
  templateUrl: './tipoindustria-table.component.html',
  styleUrls: ['./tipoindustria-table.component.css']
})
export class TipoindustriaTableComponent implements OnInit {

  @Input() tiposIndustria
  public idSelected
  public tabla
  constructor(
    private _borrar: BorrarService,
  ) {}

  ngOnInit() {
    
  }

  toDelete(id) {
    $('admin-borrar').fadeToggle()
    this._borrar.sendId(id)
  }

}
