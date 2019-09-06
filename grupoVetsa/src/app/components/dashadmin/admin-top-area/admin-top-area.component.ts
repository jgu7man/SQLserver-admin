import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'admin-top-area',
  templateUrl: './admin-top-area.component.html',
  styleUrls: ['./admin-top-area.component.css']
})
export class AdminTopAreaComponent implements OnInit {

  @Input() nombre
  @Input() apellido
  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  logout() {
    sessionStorage.removeItem('gvlog')
    this.router.navigate(['/'])
  }

  mantMenu() {
    $('#mant-menu').slideToggle()
    $('#report-menu').css('display', 'none')
  }

  closeMenu() {
    $('#report-menu').css('display', 'none')
    $('#mant-menu').css('display', 'none')
  }

  reportMenu() {
    $('#report-menu').slideToggle()
    $('#mant-menu').css('display', 'none')
  }

}
