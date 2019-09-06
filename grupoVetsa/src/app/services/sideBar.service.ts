import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { SideBarModel } from '../models/sideBar.model';

@Injectable({ providedIn: 'root' })
export class SideBarService {
    mantenimiento: any[] = [
        { key: 'Usuario', name: 'Usuarios' },
        { key: 'User_Rol', name: 'Roles de Usuario' },
        { key: 'Documento', name: 'Documentos' },
        { key: 'TipoIndustria', name: 'Tipo Industria' },
        { key: 'GrupoPersona', name: 'Grupo de personas' },
        { key: 'LineaProducto', name: 'Linea de producto' },
        { key: 'Pais', name: 'Paises' },
        { key: 'Segmento', name: 'Segmentos' },
        { key: 'TipoFiscal', name: 'Tipos Fiscales' },
        { key: 'Proveedor', name: 'Proveedores' },
    ]

    getList() {
            return this.mantenimiento
    }
}