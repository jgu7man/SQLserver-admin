import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { AlertaComponent } from './components/alerta/alerta.component';
import { DashadminComponent } from './components/dashadmin/dashadmin.component';
import { AdminTopAreaComponent } from './components/dashadmin/admin-top-area/admin-top-area.component';
import { MantenimientoComponent } from './components/dashadmin/mantenimiento/mantenimiento.component';
import { ReportesComponent } from './components/dashadmin/reportes/reportes.component';
import { SideBarComponent } from './components/dashadmin/side-bar/side-bar.component';
import { UsuarioTableComponent } from './components/dashadmin/tables/usuario-table/usuario-table.component';
import { AddUsuarioComponent } from './components/dashadmin/tables/usuario-table/add-usuario/add-usuario.component';
import { AdminAddComponent } from './components/dashadmin/admin-add/admin-add.component';
import { ChangeRolComponent } from './components/dashadmin/tables/usuario-table/change-rol/change-rol.component';
import { CategoriaTableComponent } from './components/dashadmin/tables/categoria-table/categoria-table.component';
import { ClienteTableComponent } from './components/dashadmin/tables/cliente-table/cliente-table.component';
import { DocumentoTableComponent } from './components/dashadmin/tables/documento-table/documento-table.component';
import { GrupopersonaTableComponent } from './components/dashadmin/tables/grupopersona-table/grupopersona-table.component';
import { InconsistenciaTableComponent } from './components/dashadmin/tables/inconsistencia-table/inconsistencia-table.component';
import { LineaproductoTableComponent } from './components/dashadmin/tables/lineaproducto-table/lineaproducto-table.component';
import { PaisTableComponent } from './components/dashadmin/tables/pais-table/pais-table.component';
import { ProveedorTableComponent } from './components/dashadmin/tables/proveedor-table/proveedor-table.component';
import { RolTableComponent } from './components/dashadmin/tables/rol-table/rol-table.component';
import { SegmentoTableComponent } from './components/dashadmin/tables/segmento-table/segmento-table.component';
import { TipofiscalTableComponent } from './components/dashadmin/tables/tipofiscal-table/tipofiscal-table.component';
import { TipoindustriaTableComponent } from './components/dashadmin/tables/tipoindustria-table/tipoindustria-table.component';
import { AgregarCategoriaComponent } from './components/dashadmin/tables/categoria-table/agregar-categoria/agregar-categoria.component';
import { EditarCategoriaComponent } from './components/dashadmin/tables/categoria-table/editar-categoria/editar-categoria.component';
import { BorrarCategoriaComponent } from './components/dashadmin/tables/categoria-table/borrar-categoria/borrar-categoria.component';
import { AgregarClienteComponent } from './components/dashadmin/tables/cliente-table/agregar-cliente/agregar-cliente.component';
import { EditarClienteComponent } from './components/dashadmin/tables/cliente-table/editar-cliente/editar-cliente.component';
import { BorrarClienteComponent } from './components/dashadmin/tables/cliente-table/borrar-cliente/borrar-cliente.component';
import { AgregarDocumentoComponent } from './components/dashadmin/tables/documento-table/agregar-documento/agregar-documento.component';
import { EditarDocumentoComponent } from './components/dashadmin/tables/documento-table/editar-documento/editar-documento.component';
import { BorrarDocumentoComponent } from './components/dashadmin/tables/documento-table/borrar-documento/borrar-documento.component';
import { AgregarGrupopersonaComponent } from './components/dashadmin/tables/grupopersona-table/agregar-grupopersona/agregar-grupopersona.component';
import { EditarGrupopersonaComponent } from './components/dashadmin/tables/grupopersona-table/editar-grupopersona/editar-grupopersona.component';
import { BorrarGrupopersonaComponent } from './components/dashadmin/tables/grupopersona-table/borrar-grupopersona/borrar-grupopersona.component';
import { AgregarInconsistenciaComponent } from './components/dashadmin/tables/inconsistencia-table/agregar-inconsistencia/agregar-inconsistencia.component';
import { BorrarInconsistenciaComponent } from './components/dashadmin/tables/inconsistencia-table/borrar-inconsistencia/borrar-inconsistencia.component';
import { EditarInconsistenciaComponent } from './components/dashadmin/tables/inconsistencia-table/editar-inconsistencia/editar-inconsistencia.component';
import { AgregarLineaproductoComponent } from './components/dashadmin/tables/lineaproducto-table/agregar-lineaproducto/agregar-lineaproducto.component';
import { EditarLineaproductoComponent } from './components/dashadmin/tables/lineaproducto-table/editar-lineaproducto/editar-lineaproducto.component';
import { BorrarLineaproductoComponent } from './components/dashadmin/tables/lineaproducto-table/borrar-lineaproducto/borrar-lineaproducto.component';
import { AgregarPaisComponent } from './components/dashadmin/tables/pais-table/agregar-pais/agregar-pais.component';
import { EditarPaisComponent } from './components/dashadmin/tables/pais-table/editar-pais/editar-pais.component';
import { BorrarPaisComponent } from './components/dashadmin/tables/pais-table/borrar-pais/borrar-pais.component';
import { AgregarProveedorComponent } from './components/dashadmin/tables/proveedor-table/agregar-proveedor/agregar-proveedor.component';
import { EditarProveedorComponent } from './components/dashadmin/tables/proveedor-table/editar-proveedor/editar-proveedor.component';
import { BorrarProveedorComponent } from './components/dashadmin/tables/proveedor-table/borrar-proveedor/borrar-proveedor.component';
import { AgregarRolComponent } from './components/dashadmin/tables/rol-table/agregar-rol/agregar-rol.component';
import { EditarRolComponent } from './components/dashadmin/tables/rol-table/editar-rol/editar-rol.component';
import { BorrarRolComponent } from './components/dashadmin/tables/rol-table/borrar-rol/borrar-rol.component';
import { BorrarSegmentoComponent } from './components/dashadmin/tables/segmento-table/borrar-segmento/borrar-segmento.component';
import { EditarSegmentoComponent } from './components/dashadmin/tables/segmento-table/editar-segmento/editar-segmento.component';
import { AgregarSegmentoComponent } from './components/dashadmin/tables/segmento-table/agregar-segmento/agregar-segmento.component';
import { AgregarTipofiscalComponent } from './components/dashadmin/tables/tipofiscal-table/agregar-tipofiscal/agregar-tipofiscal.component';
import { BorrarTipofiscalComponent } from './components/dashadmin/tables/tipofiscal-table/borrar-tipofiscal/borrar-tipofiscal.component';
import { EditarTipofiscalComponent } from './components/dashadmin/tables/tipofiscal-table/editar-tipofiscal/editar-tipofiscal.component';
import { EditarTipoIndustriaComponent } from './components/dashadmin/tables/tipoindustria-table/editar-tipoindustria/editar-tipoindustria.component';
import { BorrarTipoindsutriaComponent } from './components/dashadmin/tables/tipoindustria-table/borrar-tipoindsutria/borrar-tipoindsutria.component';
import { AgregarTipoindustriaComponent } from './components/dashadmin/tables/tipoindustria-table/agregar-tipoindustria/agregar-tipoindustria.component';
import { EditarUsuarioComponent } from './components/dashadmin/tables/usuario-table/editar-usuario/editar-usuario.component';
import { BorrarUsuarioComponent } from './components/dashadmin/tables/usuario-table/borrar-usuario/borrar-usuario.component';
import { AdminEditarComponent } from './components/dashadmin/admin-editar/admin-editar.component';
import { AdminBorrarComponent } from './components/dashadmin/admin-borrar/admin-borrar.component';
import { PrivilegioTableComponent } from './components/dashadmin/tables/privilegio-table/privilegio-table.component';
import { AgregarPrivilegioComponent } from './components/dashadmin/tables/privilegio-table/agregar-privilegio/agregar-privilegio.component';
import { EditarPrivilegioComponent } from './components/dashadmin/tables/privilegio-table/editar-privilegio/editar-privilegio.component';
import { SolicitudCreditoComponent } from './components/dashadmin/solicitud-credito/solicitud-credito.component';
import { ClientesPorPagoComponent } from './components/dashadmin/tables/clientes-por-pago/clientes-por-pago.component';
import { SolicitudesTableComponent } from './components/dashadmin/tables/solicitudes-table/solicitudes-table.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AlertaComponent,
    DashadminComponent,
    AdminTopAreaComponent,
    MantenimientoComponent,
    ReportesComponent,
    SideBarComponent,
    UsuarioTableComponent,
    AddUsuarioComponent,
    AdminAddComponent,
    ChangeRolComponent,
    CategoriaTableComponent,
    ClienteTableComponent,
    DocumentoTableComponent,
    GrupopersonaTableComponent,
    InconsistenciaTableComponent,
    LineaproductoTableComponent,
    PaisTableComponent,
    ProveedorTableComponent,
    RolTableComponent,
    SegmentoTableComponent,
    TipofiscalTableComponent,
    TipoindustriaTableComponent,
    AgregarCategoriaComponent,
    EditarCategoriaComponent,
    BorrarCategoriaComponent,
    AgregarClienteComponent,
    EditarClienteComponent,
    BorrarClienteComponent,
    AgregarDocumentoComponent,
    EditarDocumentoComponent,
    BorrarDocumentoComponent,
    AgregarGrupopersonaComponent,
    EditarGrupopersonaComponent,
    BorrarGrupopersonaComponent,
    AgregarInconsistenciaComponent,
    BorrarInconsistenciaComponent,
    EditarInconsistenciaComponent,
    AgregarLineaproductoComponent,
    EditarLineaproductoComponent,
    BorrarLineaproductoComponent,
    AgregarPaisComponent,
    EditarPaisComponent,
    BorrarPaisComponent,
    AgregarProveedorComponent,
    EditarProveedorComponent,
    BorrarProveedorComponent,
    AgregarRolComponent,
    EditarRolComponent,
    BorrarRolComponent,
    BorrarSegmentoComponent,
    EditarSegmentoComponent,
    AgregarSegmentoComponent,
    AgregarTipofiscalComponent,
    BorrarTipofiscalComponent,
    EditarTipofiscalComponent,
    EditarTipoIndustriaComponent,
    BorrarTipoindsutriaComponent,
    AgregarTipoindustriaComponent,
    EditarUsuarioComponent,
    BorrarUsuarioComponent,
    AdminEditarComponent,
    AdminBorrarComponent,
    PrivilegioTableComponent,
    AgregarPrivilegioComponent,
    EditarPrivilegioComponent,
    SolicitudCreditoComponent,
    ClientesPorPagoComponent,
    SolicitudesTableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
