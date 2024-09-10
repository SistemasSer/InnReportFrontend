export interface IPucCoop {
	Codigo: string;
	Descripcion: string;
	Agrupa: string | null;
	CreditoRiesgo: number;
	created_at: Date | null,
	updated_at: Date | null
  }
  
export class PucCoop implements IPucCoop {
	public Codigo: string;
	public Descripcion: string;
	public Agrupa: string | null;
	public CreditoRiesgo: number;
	public created_at: Date | null;
	public updated_at: Date | null;

	constructor() {
		this.Codigo = '';
		this.Descripcion = '';
		this.Agrupa = null;
		this.CreditoRiesgo = 0;
		this.created_at = null; 
		this.updated_at = null; 
	}
}
  