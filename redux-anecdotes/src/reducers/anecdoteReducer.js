import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const anecdotesAtStart = [
]


const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)

const anecdoteSlice = createSlice({
  name: 'anecdote',
  initialState,
  reducers: {
    addVote(state, action) {
      const anecdoteToUpdate = state.find(n => n.id === action.payload)
      const updateAnecdote = { ...anecdoteToUpdate, votes: anecdoteToUpdate.votes + 1 }
      return state.map(anecdote => anecdote.id !== action.payload ? anecdote : updateAnecdote)
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  },
})




export default anecdoteSlice.reducer
export const { addVote, appendAnecdote, setAnecdotes } = anecdoteSlice.actions
export const initialiseAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const newVote = id => {
  return async dispatch => {
    await anecdoteService.addVote(id)
    dispatch(addVote(id))
  }
}
