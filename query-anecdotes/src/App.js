import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { getAnecdotes, updateAnecdote } from './requests'
import NotificationContext from './NotificationContext'
import { useContext } from 'react'


const App = () => {

  const [notification, notificationDispatch] = useContext(NotificationContext)

  const result = useQuery(
    'anecdotes',
    getAnecdotes,
    { retry: 1 }
  )

  const queryClient = useQueryClient()

  const updateAnecdoteMutation = useMutation(updateAnecdote, {
    onSuccess: (updateAnecdote) => {
      const anecdotes = queryClient.getQueryData('anecdotes')
      anecdotes[anecdotes.findIndex(anecdote => anecdote.id === updateAnecdote.id)].votes++
      queryClient.setQueryData('anecdotes', anecdotes)
      notificationDispatch({ type: 'SET', payload: `anecdote '${updateAnecdote.content}' voted` })
      setTimeout(() => notificationDispatch({ type: 'CLEAR' }), 5000)
    }
  })

  const handleVote = (anecdote) => {
    updateAnecdoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 })
  }

  if (result.isLoading) {
    return <div>loading data...</div>
  }

  if (result.isError) {
    return <div>anecdote service not available due to problems in server</div>
  }

  const anecdotes = result.data

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
