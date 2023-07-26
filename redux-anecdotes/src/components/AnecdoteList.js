import { useSelector, useDispatch } from 'react-redux'
import { newVote } from '../reducers/anecdoteReducer'
import { addNotification } from '../reducers/notificationReducer'


const AnecdoteList = () => {
    const anecdotes = useSelector(state => {
        return state.anecdotes.filter(anecdote => {
            return anecdote.content.includes(state.filter)
        })
    })
    const dispatch = useDispatch()

    const vote = (id, content) => {
        dispatch(newVote(id))
        dispatch(addNotification(`you voted "${content}"`, 5))

    }
    return (
        <>
            {anecdotes.toSorted((a, b) => { return (b.votes - a.votes) }).map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
                    </div>
                </div>
            )}
        </>
    )
}
export default AnecdoteList