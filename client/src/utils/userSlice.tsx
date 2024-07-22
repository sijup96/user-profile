import { createSlice } from "@reduxjs/toolkit";


 interface UserInfo {
    name: string;
    email: string;
    image: string;

}
export interface UserState {
    userInfo: UserInfo | null
}
const initialState: UserState = { userInfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')!) : null }

const userSlice = createSlice({
    name: 'User',
    initialState,
    reducers: {
        setCredentials: (state, action) => {                        
            state.userInfo = action.payload
            localStorage.setItem('userInfo', JSON.stringify(action.payload))
        },
        logout: (state) => {
            state.userInfo = null
            localStorage.removeItem('userInfo')
        }
    }

})
export const { setCredentials, logout } = userSlice.actions;
export default userSlice.reducer;