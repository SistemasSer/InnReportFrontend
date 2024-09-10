import { api, headerAPI, token } from "../configs/axios";
import { IActive } from '../interfaces/Active';
import { useAuth } from "../auth/AuthProvider";


export class ActiveService {

    private apiURL = "v1/bal_sup_a";
    // private token = useAuth().getAccessToken;
    // private token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjk4MDQ3Mzc4LCJpYXQiOjE2OTgwNDcwNzgsImp0aSI6ImJhZTYxYjc1Yzc2ZDRlYzhiMjljMmZhYTY3ZGU4OWU2IiwidXNlcl9pZCI6MX0.eLxZo2APq_WtRUTLbeWHnRRk9DyMZ_Qz3I-q4q_huA0"
    

    public async post(data: any): Promise<IActive[]> { // Ensure that the method is supposed to return a Promise that resolves to an array of IActive
        try {
          const response = await api.post<IActive[]>(`${this.apiURL}`, data, {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',                
            }
          });
          return response.data; // Assuming that the API returns an array of IActive objects
        } catch (error) {
          console.log(error);
          throw error;
        }
      }
      
}