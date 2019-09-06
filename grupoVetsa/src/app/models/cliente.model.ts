export class ClienteModel{
    constructor(
        public id: number,
        public GrupoEmpresarial: string,
        public RegistroTributario: string,
        public TipoRegistro: number,
        public Direccion: string,
        public WebPage: string,
        public Actividad: string,
        public LineaProducto: number,
        public Vision: string,
        public Mision: string,
        public Valores: string,
        public Pais: number,
        public Telefono: string,
        public Industria: string,
        public TipoIndustria: number,
        public Segmento: number,
        public RSE: string,
        public Marcas: string,
        public PaisFacturacion: number,
        public CreatedBy: number,
        public ModifiedBy: number
    ){}
}