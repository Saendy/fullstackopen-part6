
import { createSlice } from '@reduxjs/toolkit'

const initialState = ''


const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        setNotification(state, action) {
            return action.payload
        },
        clearNotification(state, action) {
            return ''
        }
    }
})


export default notificationSlice.reducer
export const { setNotification, clearNotification } = notificationSlice.actions

export const addNotification = (notification, time) => {
    return dispatch => {
        dispatch(setNotification(`new note added "${notification}"`))
        setTimeout(() => dispatch(clearNotification()), time * 1000);
    }
}