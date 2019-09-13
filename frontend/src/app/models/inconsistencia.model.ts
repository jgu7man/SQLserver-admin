export class InconsistenciaModel {
    constructor(
        public id: number,
        public FechaRegistro: string,
        public FechaRecepcion: string,
        public Cliente: number,
        public HojaRuta: string,
        public Proveedor: number,
        public Documento: number,
        public NumeroDocumento: string,
        public Categoria: number,
        public CreatedBy: number,
        public ModifiedBy: number
    ){}
}