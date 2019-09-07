import { Component, OnInit } from '@angular/core';
import { DocumentoModel } from 'src/app/models/documento.model';
import { MantenimientoService } from '../../../../../services/mantenimiento.service';
import { AlertaService } from '../../../../../services/alerta.service';
// AGREGAR ROUTER
import { Router } from '@angular/router';

@Component({
  selector: 'agregar-documento',
  templateUrl: './agregar-documento.component.html',
  styleUrls: ['./agregar-documento.component.css']
})
export class AgregarDocumentoComponent implements OnInit {

  public Documento: DocumentoModel
  constructor(
    private _mant: MantenimientoService,
    private _alerta: AlertaService,
    // DECLARAR ROUTER
    private router: Router
  ) {
    this.Documento = new DocumentoModel(0,'',0,0)
   }

  ngOnInit() {
    var user = JSON.parse(sessionStorage.getItem('gvlog'))
    this.Documento.ModifiedBy = user.UserId
    this.Documento.CreatedBy = user.UserId
  }

  onSubmit() {
    this._mant.saveData('Documento', this.Documento).subscribe(res => {
      this._alerta.setAlerta(res)
      // INCLUIR EL LINK DE REDIRECCIÓN CAMBIANDO EL NOMBRE DE LA TABLA AL FINAL AL COMPONENTE PERTENENCIENTE
      this.router.navigate(['/dashadmin/mantenimiento/Documento'])
    })
  }

}