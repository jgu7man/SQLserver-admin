import { Component, OnInit, Input } from '@angular/core';
import { SideBarService } from 'src/app/services/sideBar.service';
import { SideBarModel } from "../../../models/sideBar.model";

@Component({
  selector: 'side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {

  @Input() page = 'mantenimiento'
  public lista: SideBarModel[] = []
  constructor(
    private _sideBar: SideBarService
  ) {
    
   }

  ngOnInit() {
    this.lista = this._sideBar.getList() as SideBarModel[]
  }

}
