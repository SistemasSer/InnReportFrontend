import { api, headerAPI, token } from "../configs/axios";
import { IUser } from '../interfaces/User';
import { useAuth } from "../auth/AuthProvider";


export class UserService {

    private apiURL = "user/";
    // private token = useAuth().getAccessToken;
    // private token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjk4MDcxMDQ0LCJpYXQiOjE2OTgwNzA3NDQsImp0aSI6IjViMjYxNGEzNmRjMDQyNDI4MDU0ZjQ0NGNiOTFmYTk0IiwidXNlcl9pZCI6MX0.n5XlRwHSdF76waPfnHAjPcf_V8H3ZQDHOiNrBFWHqOE"
    
    public async getAll() {

        try {
            const response = await api.get<IUser[]>(`${this.apiURL}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            return await response.data            
        } catch (error) {
            throw error;
        }
    }

    public async post(data: IUser) {
        try {
            const response = await api.post<IUser>(`auth/register/`, data, {
                headers: {
                    'Content-Type': 'application/json',                
                }
            });
            return response.data;            
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    // public async post(data:IUser) {
    //     try {

    //         const response = await api.post<IUser>(`auth/register/`, data,{
    //             headers: {
    //                 'Authorization': `Bearer ${token}`,
    //                 'Content-Type': 'application/json',                
    //             }
    //         })
    //         return await response.data            
    //     } catch (error) {
    //         console.log(error)
    //         throw error;
    //     }
    // }

    public async getById(id:number){
        try {
            const response = await api.get<IUser>(`${this.apiURL}/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',                
                }
            })
            const data: IUser = response.data 
            return data          
        } catch (error) {
            console.log(error)
            throw error;
        }
    }

    public async put(data:IUser) {
        try {
            const response = await api.put<IUser>(`${this.apiURL}${data.id}`, data, headerAPI)
            return await response.data            
        } catch (error) {
            console.log(error)
            throw error;
        }
    }

    public async delete(data:IUser) {
        try {
            const response = await api.delete(`${this.apiURL}${data.id}/`, {
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