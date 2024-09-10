import { api, headerAPI, token } from "../configs/axios";
import { IPucCoop } from '../interfaces/PucCoop';
import { useAuth } from "../auth/AuthProvider";


export class PucCoopService {

    private apiURL = "v1/puc_coop";
    private token = useAuth().getAccessToken;
    
    public async getAll() {
        // const token = ""
        // const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjk4MDM3MDI1LCJpYXQiOjE2OTgwMzY3MjUsImp0aSI6IjVkOGUyMDYxMzE1ZDRhNWU5MDA4YzgwMjE5MDg4Nzc1IiwidXNlcl9pZCI6MX0.HsMcW5Oh5_ut2A2vXoyInRXU5GsQiJdmENuDemsNPKU"
        try {
            const response = await api.get<IPucCoop[]>(`${this.apiURL}`, {
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

    public async post(data:IPucCoop) {
        try {
            const response = await api.post<IPucCoop>(`${this.apiURL}`, data, headerAPI)
            return await response.data            
        } catch (error) {
            console.log(error)
            throw error;
        }
    }

    public async getById(id:number){
        try {
            const response = await api.get<IPucCoop>(`${this.apiURL}/${id}`, headerAPI)
            const data: IPucCoop = response.data 
            return data          
        } catch (error) {
            console.log(error)
            throw error;
        }
    }

}