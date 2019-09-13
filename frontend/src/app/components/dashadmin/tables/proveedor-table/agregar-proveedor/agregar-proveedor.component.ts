import { Component, OnInit } from '@angular/core';
import { ProveedorModel } from '../../../../../models/proveedor.model';
import { MantenimientoService } from '../../../../../services/mantenimiento.service';
import { AlertaService } from '../../../../../services/alerta.service';
import { Router } from '@angular/router';

@Component({
  selector: 'agregar-proveedor',
  templateUrl: './agregar-proveedor.component.html',
  styleUrls: ['./agregar-proveedor.component.css']
})
export class AgregarProveedorComponent implements OnInit {

  public proveedor: ProveedorModel
  public TipoFiscal_items = []
  public Pais_items = []
  public Segmento_items = []
  public Cliente_items = []
  public GrupoPersona_items = []
  constructor(
    private _mant: MantenimientoService,
    private _alerta: AlertaService,
    private router: Router
  ) {
    this.proveedor = new ProveedorModel(0,'','',0,0,0,0,0,0,0,0)
   }

  ngOnInit() {
    this.getTablas()
    var user = JSON.parse(sessionStorage.getItem('gvlog'))
    this.proveedor.ModifiedBy = user.UserId
    this.proveedor.CreatedBy = user.UserId
  }

  getTablas() {
    this._mant.getData('TipoFiscal').subscribe(res => { this.TipoFiscal_items = res })
    this._mant.getData('Cliente').subscribe(res => { this.Cliente_items = res })
    this._mant.getData('Pais').subscribe(res => { this.Pais_items = res })
    this._mant.getData('Segmento').subscribe(res => { this.Segmento_items = res })
    this._mant.getData('GrupoPersona').subscribe( res => { this.GrupoPersona_items = res })
  }



  onSubmit() {
    this.proveedor.TipoIdentificador = +this.proveedor.TipoIdentificador
    this.proveedor.GrupoPersona = +this.proveedor.GrupoPersona
    this.proveedor.Cliente = +this.proveedor.Cliente
    this.proveedor.Pais = +this.proveedor.Pais
    this.proveedor.PaisOperacion = +this.proveedor.PaisOperacion
    this.proveedor.Segmento = +this.proveedor.Segmento
    this._mant.saveData('Proveedor', this.proveedor).subscribe(res => {
      this._alerta.setAlerta(res)
      this.router.navigate(['/dashadmin/mantenimiento/Proveedor'])
    })
  }

  

}
