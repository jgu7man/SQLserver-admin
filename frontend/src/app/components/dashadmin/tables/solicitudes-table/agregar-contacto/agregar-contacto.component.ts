import { Component, OnInit, Input } from '@angular/core';
import { ContactoModel } from '../../../../../models/contacto.model';
import { MantenimientoService } from '../../../../../services/mantenimiento.service';
import { AlertaService } from '../../../../../services/alerta.service';

@Component({
  selector: 'agregar-contacto',
  templateUrl: './agregar-contacto.component.html',
  styleUrls: ['./agregar-contacto.component.css']
})
export class AgregarContactoComponent implements OnInit {

  public contacto: ContactoModel
  @Input() clienteId: number
  @Input() clienteName: string
  constructor(
    private _mant: MantenimientoService,
    private _alerta: AlertaService
  ) {
    this.contacto = new ContactoModel(0,'','','','',0,0,0)
   }

  ngOnInit() {
    var user = JSON.parse(sessionStorage.getItem('gvlog'))
    this.contacto.CreatedBy = user.UserId
    this.contacto.ModifiedBy = user.UserId
  }


  onClose() {
    $("agregar-contacto").fadeToggle()
  }

  onSubmit() {
    this.contacto.Cliente = +this.clienteId
    this._mant.saveData('Contacto', this.contacto).subscribe(res => {
      this._alerta.setAlerta(res)
      $("agregar-contacto").fadeToggle()
    })
  }

}
