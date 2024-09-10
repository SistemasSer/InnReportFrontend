import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IActive, Active } from '../../interfaces/Active';

export interface ActiveState {
    data: IActive;
    list: IActive[]
}

const initialState: ActiveState = {
    data: new Active(),
    list: []
} 

export const activeSlice = createSlice({
    name: 'active',
    initialState,
    reducers: { 
        setData: (state: any, action: PayloadAction<IActive>) => {
            state.data = action.payload
        },
        setActive: (state: any, action: PayloadAction<IActive[]>) => {
            state.list = action.payload
        },
    }
})

export const { setData, setActive } = activeSlice.actions

export default activeSlice.reducer