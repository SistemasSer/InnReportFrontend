import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IPucSup, PucSup } from '../../interfaces/PucSup';

export interface PucSupState {
    data: IPucSup;
    list: IPucSup[]
}

const initialState: PucSupState = {
    data: new PucSup(),
    list: []
} 

export const pucSupSlice = createSlice({
    name: 'pucSup',
    initialState,
    reducers: { 
        setData: (state: any, action: PayloadAction<IPucSup>) => {
            state.data = action.payload
        },
        setPucSup: (state: any, action: PayloadAction<IPucSup[]>) => {
            state.list = action.payload
        },
    }
})

export const { setData, setPucSup } = pucSupSlice.actions

export default pucSupSlice.reducer