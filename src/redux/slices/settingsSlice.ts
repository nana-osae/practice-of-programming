import { createSlice} from "@reduxjs/toolkit";



const settingsSlice = createSlice({
    name:'settings',
    initialState:{
        lightAndDarkmood:false as boolean,
        disableVibrationOnNotification:false as boolean
    },
    reducers:{
        toggleMode:(state) => {
            state.lightAndDarkmood = !state.lightAndDarkmood
        }, 
        toggleDisable:(state) => {
            console.log(state.disableVibrationOnNotification)
            state.disableVibrationOnNotification = !state.disableVibrationOnNotification
        }
    }
})

export const {toggleMode, toggleDisable} = settingsSlice.actions;

export default settingsSlice.reducer;