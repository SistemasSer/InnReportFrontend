import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IPucCoop, PucCoop } from '../../interfaces/PucCoop';

export interface PucCoopState {
    data: IPucCoop;
    list: IPucCoop[]
}

const initialState: PucCoopState = {
    data: new PucCoop(),
    list: []
} 

export const pucCoopSlice = createSlice({
    name: 'pucCoop',
    initialState,
    reducers: { 
        setData: (state: any, action: PayloadAction<IPucCoop>) => {
            state.data = action.payload
        },
        setPucCoop: (state: any, action: PayloadAction<IPucCoop[]>) => {
            state.list = action.payload
        },
    }
})

export const { setData, setPucCoop } = pucCoopSlice.actions

export default pucCoopSlice.reducer