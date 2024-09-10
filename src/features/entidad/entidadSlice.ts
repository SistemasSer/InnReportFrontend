import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IEntidad, Entidad } from '../../interfaces/Entidad';

export interface EntidadState {
    data: IEntidad;
    list: IEntidad[]
}

const initialState: EntidadState = {
    data: new Entidad(),
    list: []
} 

export const entidadSlice = createSlice({
    name: 'entidad',
    initialState,
    reducers: { 
        setData: (state: any, action: PayloadAction<IEntidad>) => {
            state.data = action.payload
        },
        setEntidad: (state: any, action: PayloadAction<IEntidad[]>) => {
            state.list = action.payload
        },
    }
})

export const { setData, setEntidad } = entidadSlice.actions

export default entidadSlice.reducer