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
    AdminAddComponent
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
