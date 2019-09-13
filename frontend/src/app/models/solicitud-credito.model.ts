export class SolicitudCreditoModel {
    constructor(
        public id: number,
        public Cliente: number,
        public TramitesMensualesEsperados: string,
        public ProyeccionCM1Mensual: string,
        public ProyeccionVolumenMensual: string,
        public MontoSolicitado: number,
        public TiempoCredito: number,
        public Moneda: number,
        public Division: string,
        public TipoPago: number,
        public FinanciamientoImpuestos: string,
        public TiempoCreditoImpuesto: number,
        public CreatedBy: number,
        public ModifiedBy: number
    ){}
}