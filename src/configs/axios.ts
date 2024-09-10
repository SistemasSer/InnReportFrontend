import axios from 'axios'


const apiUrl = process.env.REACT_APP_API_URL_1;

export const api = axios.create({
    //baseURL: 'http://localhost:8000/api/',
    baseURL: `${apiUrl}/`,
}); 

export const headerAPI = {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  }

export const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjk4NjIzNzc3LCJpYXQiOjE2OTg2MjM0NzcsImp0aSI6ImZkZGY2ZjI0ZjcyYTQwNzQ4ZTAzZjk1M2QzOGJiYmUyIiwidXNlcl9pZCI6MX0.P7cN7WzcmPIYyHSebVRFHQ2jSJxTmRG2xS3qFAa_hZQ'


  