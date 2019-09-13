export class UsuarioModel {
    constructor(
        public UserId: number,
        public RolId: number,
        public UserName: string,
        public Password: string,
        public FirstName: string,
        public LastName: string,
        public CreatedBy: number,
        public ModifiedBy: number
    ){}
}