import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { SideBarService } from '../../../services/sideBar.service';
import { PermisosService } from '../../../services/permisos.service';

@Component({
  selector: 'admin-top-area',
  templateUrl: './admin-top-area.component.html',
  styleUrls: ['./admin-top-area.component.css']
})
export class AdminTopAreaComponent implements OnInit {

  @Input() usuario: any
  listMenu
  public permisos;
  constructor(
    private router: Router,
    private menus: SideBarService,
    private _permisos: PermisosService
  ) { }

  ngOnInit() {
    this._permisos.getPermisos(this.usuario.UserId).subscribe(res => {
      this.permisos = res
    })
  }

  getListMenu(list: string) {
    this.menus.getList(list)
  }

  logout() {
    sessionStorage.removeItem('gvlog')
    this.router.navigate(['/'])
  }

  openMenu(menu) {
    $('.list-menu').css('display', 'none')
    this.listMenu = this.menus.getList(menu)
    $('#'+menu).slideDown()
  }

  closeMenu() {
    $('.list-menu').slideUp()
  }

  getPermisos(id) {
    this._permisos.getPermisos(id).subscribe(res => {
      this.permisos = res
    })
  }

  

}
