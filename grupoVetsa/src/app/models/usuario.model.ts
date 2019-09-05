export class UsuarioModel {
    constructor(
        public UserId: number,
        public Password: string,
        public UserName: string,
        public FirstName: string,
        public LastName: string,
        public CreatedBy: number,
        public ModifiedBy: number
    ){}
}