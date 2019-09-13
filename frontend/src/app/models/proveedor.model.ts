export class ProveedorModel {
    constructor(
        public id: number,
        public Proveedor: string,
        public IdentificadorFiscal: string,
        public TipoIdentificador: number,
        public GrupoPersona: number,
        public Cliente: number, 
        public Pais: number,
        public PaisOperacion: number,
        public Segmento: number,
        public CreatedBy: number,
        public ModifiedBy: number
    ){}
}