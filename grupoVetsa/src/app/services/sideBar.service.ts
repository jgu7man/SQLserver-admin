import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { SideBarModel } from '../models/sideBar.model';

@Injectable({ providedIn: 'root' })
export class SideBarService {
    fullList: any[] = [
        { key: 'Usuario', name: 'Usuarios' },
        { key: 'User_Rol', name: 'Roles de Usuario' },
        { key: 'Privilegio', name: 'Privilegios' },
        { key: 'Documento', name: 'Documentos' },
        { key: 'TipoIndustria', name: 'Tipo Industria' },
        { key: 'GrupoPersona', name: 'Grupos Persona' },
        { key: 'LineaProducto', name: 'Lineas Producto' },
        { key: 'Pais', name: 'Paises' },
        { key: 'Segmento', name: 'Segmentos' },
        { key: 'TipoFiscal', name: 'Tipos Fiscales' },
        { key: 'Proveedor', name: 'Proveedores' },
        { key: 'Cliente', name: 'Clientes' },
        { key: 'Categoria', name: 'Categorias' },
        { key: 'Inconsistencia', name: 'Inconsistencias' },
        { key: 'Rol', name: 'Roles' },
        { key: 'Inconsistencia&Gestor', name: 'Inconsistencias por gestor' },
        { key: 'Inconsistencia&Proveedor', name: 'Inconsistencias por proveedor' },
        { key: 'Inconsistencia&Cliente', name: 'Inconsistencias por Cliente' },
        { key: 'Cliente&EFECTIVO', name: 'Clientes pago en Efectivo' },
        { key: 'Cliente&CREDITO', name: 'Clientes pagoa a Credito' },
        { key: 'ReporteSegmento', name: 'Reporte Segmento' },
    ]

    mantMenu: any[] = [
        { key: 'Usuario', name: 'Usuarios', permiso:1 },
        { key: 'Rol', name: 'Roles', permiso: 1 },
        { key: 'Privilegio', name: 'Privilegios', permiso: 1 },
        { key: 'Rol_Privilegio', name: 'Privilegios de Roles', permiso: 1 },
    ]

    provMenu: any[] = [
        { key: 'Proveedor', name: 'Proveedores', permiso: 2 },
        { key: 'Pais', name: 'Paises', permiso: 2 },
        { key: 'LineaProducto', name: 'Lineas Producto', permiso: 2 },
        { key: 'TipoFiscal', name: 'Tipos Fiscales', permiso: 2 },
    ]

    clientMenu: any[] = [
        { key: 'Cliente', name: 'Clientes', permiso: 3 },
        { key: 'Solicitud', name: 'Solicitudes de clientes', permiso: 3 },
        { key: 'Segmento', name: 'Segmentos', permiso: 3 },
        { key: 'GrupoPersona', name: 'Grupos Persona', permiso: 3 },
        { key: 'TipoIndustria', name: 'Tipo Industria', permiso: 3 },
    ]

    inconsMenu: any[] = [
        { key: 'Inconsistencia', name: 'Inconsistencias', permiso: 4 },
        { key: 'Categoria', name: 'Categorias', permiso: 4 },
        { key: 'Documento', name: 'Documentos', permiso: 4 },
    ]

    reportMenu: any[] = [
        { key: 'Inconsistencia&Gestor', name: 'Inconsistencias por gestor', permiso: 5 },
        { key: 'Inconsistencia&Proveedor', name: 'Inconsistencias por proveedor', permiso: 5 },
        { key: 'Inconsistencia&Cliente', name: 'Inconsistencias por Cliente', permiso: 5 },
        
        { key: 'ReporteSegmento', name: 'Reporte Segmento', permiso: 5 },
    ]

    getFullList() {
        return this.fullList
    }

    getList(list: string) {
        switch (list) {
            case 'mantMenu': return this.mantMenu;
                break;
            case 'provMenu': return this.provMenu;
                break;
            case 'clientMenu': return this.clientMenu;
                break;
            case 'inconsMenu': return this.inconsMenu;
                break;
            case 'reportMenu': return this.reportMenu;
                break;
        }
    }
}