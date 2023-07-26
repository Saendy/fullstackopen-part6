
import { createSlice } from '@reduxjs/toolkit'

const initialState = ''
/*
const setFilter = (filter) => {
   return {
       type: 'SET_FILTER',
       payload: { filter }
   }
}

const reducer = (state = initialState, action) => {
   console.log('state now: ', state)
   console.log('action', action)

   switch (action.type) {
       case 'SET_FILTER': {
           return action.payload.filter
       }
       default: return state
   }

}
*/

const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setFilter(state, action) {
            return action.payload
        }
    }
})


export default filterSlice.reducer
export const { setFilter } = filterSlice.actions