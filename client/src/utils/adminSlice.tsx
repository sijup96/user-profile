import { createSlice } from "@reduxjs/toolkit";

interface AdminInfo {
    email: string;
    token:string;
}
export interface AdminState {
    adminInfo: AdminInfo | null
}
const initialState: AdminState = { adminInfo: localStorage.getItem('adminInfo') ? JSON.parse(localStorage.getItem('adminInfo') as string) : null }
const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        addAdmin: (state, action) => {
            state.adminInfo = action.payload
            localStorage.setItem('adminInfo', JSON.stringify(action.payload))
        },
        removeAdmin: (state) => {
            state.adminInfo = null,
                localStorage.removeItem('adminInfo')
        }
    }
})
export const { addAdmin, removeAdmin } = adminSlice.actions;
export default adminSlice.reducer;