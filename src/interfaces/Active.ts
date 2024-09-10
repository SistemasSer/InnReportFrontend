export interface IActive {
	entidad_nit: number | null,
	sigla:string,
	RazonSocial:string,
	periodo: number,
	puc_codigo: string,
	mes: number,
	saldo: number,
	[key: string]: any;
}

export class Active implements IActive{
	public entidad_nit: null;
	public sigla: string;
	public RazonSocial: string;
	public periodo: number;
	public puc_codigo: string;
	public mes: number;
	public saldo: number;

	constructor(){
		this.entidad_nit = null;
		this.sigla = '';
		this.RazonSocial = '';
		this.periodo = 0;
		this.puc_codigo = '';
		this.mes = 0;
		this.saldo = 0;
	}
}
