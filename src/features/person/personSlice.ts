import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IPerson, Person } from '../../interfaces/Person';

export interface PersonState {
    data: IPerson;
    list: IPerson[]
}

const initialState: PersonState = {
    data: new Person(),
    list: []
} 

export const personSlice = createSlice({
    name: 'person',
    initialState,
    reducers: { 
        setData: (state: any, action: PayloadAction<IPerson>) => {
            state.data = action.payload
        },
        setPersons: (state: any, action: PayloadAction<IPerson[]>) => {
            state.list = action.payload
        },
    }
})
console.log(personSlice.reducer)

export const { setData, setPersons } = personSlice.actions

export default personSlice.reducer