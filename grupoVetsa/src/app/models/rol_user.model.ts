export class Rol_UserModel{
    constructor(
        public UserId: number,
        public RolId: number,
        public CreatedBy: number,
        public ModifiedBy: number
    ){}
}