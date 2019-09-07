import { Component, OnInit } from '@angular/core';
import { CategoriaModel } from 'src/app/models/categoria.model';
import { MantenimientoService } from '../../../../../services/mantenimiento.service';
import { AlertaService } from '../../../../../services/alerta.service';
import { Router } from '@angular/router';

@Component({
  selector: 'agregar-categoria',
  templateUrl: './agregar-categoria.component.html',
  styleUrls: ['./agregar-categoria.component.css']
})
export class AgregarCategoriaComponent implements OnInit {

  public categoria: CategoriaModel
  constructor(
    private _mant: MantenimientoService,
    private _alerta: AlertaService,
    private router: Router
  ) {
    this.categoria = new CategoriaModel(0,'',0,0)
   }

  ngOnInit() {
    var user = JSON.parse(sessionStorage.getItem('gvlog'))
    this.categoria.ModifiedBy = user.UserId
    this.categoria.CreatedBy = user.UserId
  }

  onSubmit() {
    this._mant.saveData('Categoria', this.categoria).subscribe(res => {
      this._alerta.setAlerta(res)
      this.router.navigate(['/dashadmin/mantenimiento/Categoria'])
    })
  }

}
