import { Component, OnInit, Input } from '@angular/core';
import { BorrarService } from '../../../../services/borrar.service';

@Component({
  selector: 'categoria-table',
  templateUrl: './categoria-table.component.html',
  styleUrls: ['./categoria-table.component.css']
})
export class CategoriaTableComponent implements OnInit {

  @Input() categorias
  public idSelected
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
