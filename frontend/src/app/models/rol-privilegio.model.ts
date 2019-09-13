export class Rol_PrivilegioModel {
    constructor(
        public id: number,
        public RolId: number,
        public PrivilegioId: number,
        public CreatedBy: number,
        public ModifiedBy: number
    ){}
}