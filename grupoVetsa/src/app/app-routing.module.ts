import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashadminComponent } from './components/dashadmin/dashadmin.component';
import { MantenimientoComponent } from './components/dashadmin/mantenimiento/mantenimiento.component';
import { ReportesComponent } from './components/dashadmin/reportes/reportes.component';
import { AdminAddComponent } from './components/dashadmin/admin-add/admin-add.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'dashadmin', component: DashadminComponent, children: [
    { path: '', component: MantenimientoComponent },
    { path: 'mantenimiento', component: MantenimientoComponent },
    { path: 'mantenimiento/:string', component: MantenimientoComponent },
    { path: 'mantenimiento/add/:string', component: AdminAddComponent },
    { path: 'reportes', component: ReportesComponent }
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
