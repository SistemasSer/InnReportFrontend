export interface IUser {
	id: number | null,
	username: string,
	email: string,
	password: string,
	is_staff: boolean,
	is_active: boolean,
	createdAt: Date | null,
	updatedAt: Date | null
}

export class User implements IUser{
	public id: null;
	public username: string;
	public email: string;
	public password: string;
	public is_staff: boolean;
	public is_active: boolean;
	public createdAt: Date | null;
	public updatedAt: Date | null;

	constructor(){
		this.id = null;
		this.username = '';
		this.email = '';
		this.password = '';
		this.is_staff = true;
		this.is_active = true;
		this.createdAt = null;
		this.updatedAt = null;
	}
}
