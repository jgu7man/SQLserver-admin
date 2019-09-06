import { Component, OnInit } from '@angular/core';
import { DocumentoModel } from 'src/app/models/documento.model';
import { MantenimientoService } from '../../../../../services/mantenimiento.service';
import { AlertaService } from '../../../../../services/alerta.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'editar-documento',
  templateUrl: './editar-documento.component.html',
  styleUrls: ['./editar-documento.component.css']
})
export class EditarDocumentoComponent implements OnInit {

  public documento: DocumentoModel
  public ruta
  public id
  constructor(
    private _mant: MantenimientoService,
    private _ruta: ActivatedRoute,
    private _alerta: AlertaService
  ) {
    this._ruta.params.subscribe(ruta => {
      this.ruta = ruta['string']
      this.id = ruta['id']
    })
    this.documento = new DocumentoModel(0,'',0,0,)
   }

  ngOnInit() {
    this._mant.selectData(this.ruta, this.id).subscribe(res => {
      this.documento = res
      console.log(this.documento);
    })
    var user = JSON.parse(sessionStorage.getItem('gvlog'))
    this.documento.ModifiedBy = user.UserId
    this.documento.CreatedBy = user.UserId
  }

  onSubmit() {
    this._mant.saveData('Documento', this.documento).subscribe(res => {
      this._alerta.setAlerta(res)
    })
  }

  

}
