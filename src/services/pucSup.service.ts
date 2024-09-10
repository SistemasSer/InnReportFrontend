import { api, headerAPI, token } from "../configs/axios";
import { IPucSup } from '../interfaces/PucSup';
import { useAuth } from "../auth/AuthProvider";


export class PucSupService {

    private apiURL = "v1/puc_sup";
    private token = useAuth().getAccessToken;
    
    public async getAll() {
        // const token = ""
        // const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjk4MDQyMTY4LCJpYXQiOjE2OTgwNDE4NjgsImp0aSI6ImY4YThjNjJhZWUxODRmZGU4NGU0NTdiODE0MTI1YjFiIiwidXNlcl9pZCI6MX0.68md6E4B_8sEyPME_G5lojW-4HLZqhKGUorUPtez02Q"
        try {
            const response = await api.get<IPucSup[]>(`${this.apiURL}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            return await response.data            
        } catch (error) {
            console.log(this.token)
            throw error;
        }
    }

    public async post(data:IPucSup) {
        try {
            const response = await api.post<IPucSup>(`${this.apiURL}`, data, headerAPI)
            return await response.data            
        } catch (error) {
            console.log(error)
            throw error;
        }
    }

    public async getById(id:number){
        try {
            const response = await api.get<IPucSup>(`${this.apiURL}/${id}`, headerAPI)
            const data: IPucSup = response.data 
            return data          
        } catch (error) {
            console.log(error)
            throw error;
        }
    }

}