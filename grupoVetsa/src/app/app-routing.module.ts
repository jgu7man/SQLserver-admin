import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashadminComponent } from './components/dashadmin/dashadmin.component';
import { MantenimientoComponent } from './components/dashadmin/mantenimiento/mantenimiento.component';
import { ReportesComponent } from './components/dashadmin/reportes/reportes.component';
import { AdminAddComponent } from './components/dashadmin/admin-add/admin-add.component';
import { AdminEditarComponent } from './components/dashadmin/admin-editar/admin-editar.component';
import { AdminBorrarComponent } from './components/dashadmin/admin-borrar/admin-borrar.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'dashadmin', component: DashadminComponent, children: [
    { path: '', redirectTo: '/dashadmin/mantenimiento', pathMatch: 'full' },
    { path: 'mantenimiento', component: MantenimientoComponent },
    { path: 'mantenimiento/:string', component: MantenimientoComponent },
    { path: 'add/:string', component: AdminAddComponent },
    { path: 'editar/:string/:id', component: AdminEditarComponent },
    { path: 'borrar/:string/:id', component: AdminBorrarComponent},
    { path: 'reportes', component: ReportesComponent }
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
