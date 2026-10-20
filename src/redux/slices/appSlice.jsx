import { createSlice } from '@reduxjs/toolkit'

const getlocalStorageTheme = () => {
    if (localStorage.getItem("theme")) {
        return JSON.parse(localStorage.getItem("theme"));
    }
    return false;
}

const initialState = {
    isDarkTheme: getlocalStorageTheme()
}

export const appSlice = createSlice({
    name: "app",
    initialState,
    reducers: {
        setTheme: (state) => {
            state.isDarkTheme = !state.isDarkTheme;
            localStorage.setItem("theme", state.isDarkTheme);
            console.log(state.isDarkTheme)
        }
    }
})

export const { setTheme } = appSlice.actions
export default appSlice.reducer