import { Component, OnInit } from '@angular/core';
import { LoginModel } from 'src/app/models/login.model';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { AlertaService } from '../../services/alerta.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public login: LoginModel
  constructor(
    private _login: LoginService,
    private _alerta: AlertaService,
    private router: Router
  ) {
    this.login = new LoginModel('','')
   }

  ngOnInit() {
    var user = JSON.parse(sessionStorage.getItem('gvlog'))
    if (user) {
      this.router.navigate(['/dashadmin'])
    }
  }

  onSubmit() {
    console.log(this.login)
    this._login.login(this.login).subscribe(res => {
      this._alerta.setAlerta(res)
      if (res.tipo == 'success') {
        sessionStorage.setItem('gvlog', JSON.stringify(res.user))
        this.router.navigate(['/dashadmin'])
      }
    })
  }

}
