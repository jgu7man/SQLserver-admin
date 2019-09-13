export class ContactoModel {
    constructor(
        public id: number,
        public Contacto: string,
        public Posicion: string,
        public Email: string,
        public Telefono: string,
        public Cliente: number,
        public CreatedBy: number,
        public ModifiedBy: number
    ){}
}