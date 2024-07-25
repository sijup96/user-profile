import { createSlice } from "@reduxjs/toolkit";


export interface UserInfo {
    name: string;
    email: string;
    _id: string;
    image: string;
    token: string;

}
export interface UserState {
    userInfo: UserInfo | null;
}
const initialState: UserState = { userInfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo') as string) : null }

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            const userInfo = action.payload;
            localStorage.setItem('userInfo', JSON.stringify(userInfo))
            state.userInfo = userInfo
            return
        },
        clearCredentials: (state) => {
            console.log('hiii', state);
            localStorage.removeItem('userInfo')
            state.userInfo = null
            return
        }
    }

})
export const { setCredentials, clearCredentials } = userSlice.actions;
export default userSlice.reducer;