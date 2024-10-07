export interface IEntidad {
	id: number | null,
	Nit: number,
	Dv: number,
	RazonSocial: string,
	TipoEntidad: number,
	CodigoSuper: number,
	Sigla: string,
	Descripcion: string,
	Departamento: string,
	Ciudad: string,
	Direccion: string,
	Telefono: string,
	Email: string,
	CIIU: number,
	RepresentanteLegal: string,
	Gremio: number,
	flag: boolean,
	Grupo_Activo: number,
	periodo: number,
	mes: number,
	fecha: string,
	createdAt: Date | null,
	updatedAt: Date | null
}

export class Entidad implements IEntidad{
	public id: null;
	public Nit: number;
	public Dv: number;
	public RazonSocial: string;
	public TipoEntidad: number;
	public CodigoSuper: number;
	public Sigla: string;
	public Descripcion: string;
	public Departamento: string;
	public Ciudad: string;
	public Direccion: string;
	public Telefono: string;
	public Email: string;
	public CIIU: number;
	public RepresentanteLegal: string;
	public Gremio: number ;
	public flag: boolean;
	public 	Grupo_Activo: number;
	public periodo: number;
	public mes: number;
	public fecha: string;
	public createdAt: Date | null;
	public updatedAt: Date | null;

	constructor(){
		this.id = null;
		this.Nit = 0;
		this.Dv = 0;
		this.RazonSocial = '';
		this.TipoEntidad = 0;
		this.CodigoSuper = 0;
		this.Sigla = '';
		this.Descripcion = '';
		this.Departamento = '';
		this.Ciudad = '';
		this.Direccion = '';
		this.Telefono = '';
		this.Email = '';
		this.CIIU = 0;
		this.RepresentanteLegal = '';
		this.Gremio = 0;
		this.flag = false;
		this.Grupo_Activo = 0;
		this.periodo = 0;
		this.mes = 0;
		this.fecha = '';
		this.createdAt = null;
		this.updatedAt = null;
	}
}
