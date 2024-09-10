import { api, headerAPI, token } from "../configs/axios";
import { IEntidad } from '../interfaces/Entidad';
import { useAuth } from "../auth/AuthProvider";


export class EntidadService {

    private apiURL = "v1/entidad";
    // private token = useAuth().getAccessToken;
    // private token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjk4MDQ3Mzc4LCJpYXQiOjE2OTgwNDcwNzgsImp0aSI6ImJhZTYxYjc1Yzc2ZDRlYzhiMjljMmZhYTY3ZGU4OWU2IiwidXNlcl9pZCI6MX0.eLxZo2APq_WtRUTLbeWHnRRk9DyMZ_Qz3I-q4q_huA0"
/** 
    public async getAll(queryString: string = ''): Promise<IEntidad[]> {
        try {
            const response = await api.get<IEntidad[]>(`${this.apiURL}${queryString}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    }
*/    

    public async getAll(queryString: string = ''): Promise<IEntidad[]> {
        try {
            const finalQueryString = queryString.startsWith('?') ? queryString : `?${queryString}`;

            const response = await api.get<IEntidad[]>(`${this.apiURL}${finalQueryString}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching data:', error);
            throw error;
        }
    }

    public async post(data:IEntidad) {
        try {

            const response = await api.post<IEntidad>(`${this.apiURL}`, data,{
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',                
                }
            })
            return await response.data            
        } catch (error) {
            console.log(error)
            throw error;
        }
    }

    public async getById(id:number){
        try {
            const response = await api.get<IEntidad>(`${this.apiURL}/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',                
                }
            })
            const data: IEntidad = response.data 
            return data          
        } catch (error) {
            console.log(error)
            throw error;
        }
    }

    public async put(data:IEntidad) {
        try {
            const response = await api.put<IEntidad>(`${this.apiURL}/${data.id}`, data, headerAPI)
            return await response.data            
        } catch (error) {
            console.log(error)
            throw error;
        }
    }

    public async delete(data:IEntidad) {
        try {
            const response = await api.delete(`${this.apiURL}/${data.id}`, {
                headers: {
                    // 'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',                
                }
            })
            return await response.data            
        } catch (error) {
            console.log(error)
            throw error;
        }
    }

}