import { useState } from 'react'


const Anecdote = ({text, votes}) => {
  return (
    <p>
      {text} <br />
      has {votes} votes  
    </p>
  )
}


const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]


  /// createEmptyArray(n [>= 0]) => [0, ...]
  /// return an array of length n filled with 0s
  const createEmptyArray = (n) => Array(n).fill(0)

  /// state: selected
  /// represented as an integer, the index of the current anecdote
  const [selected, setSelected] = useState(0)

  /// state: votes
  /// represented as an array of integers, each element of the array represents
  /// the number of votes of the anecdote that has the same index
  /// e.g. [0, 0, 0, 2] means the first three anecdotes has 0 votes and the 
  /// last one (at index 3) has 2 votes
  const [votes, setVotes] = useState(createEmptyArray(anecdotes.length))


  /// randomIndex(number upperLimit) => nonnegative integer
  /// produce a random number in range [0, upperLimit] (both inclusive)
  function randomIndex(upperLimit) {
    return Math.floor(Math.random() * (upperLimit + 1))
  }

  /// Event Handler
  /// update the state, sets the anecdote index to random position
  const updateAnecdoteIndex = () => {
    const newIndex = randomIndex(anecdotes.length - 1)
    setSelected(newIndex)
  }

  /// Event Handler
  /// increment the votes of the current displayed anecdote
  const updateVotes = () => {
    let updatedVotes = [...votes]
    updatedVotes[selected] += 1
    setVotes(updatedVotes)
  }

  /// updateVotes() => integer (number)
  /// return the index of the ancedote with the maximum votes
  /// if there are multiple such ancedote, return the index of the first one. 
  const maxVotesIndex = () => {
    let max = Math.max(...votes)
    return anecdotes
          .map((_, i) => i) // [0, 1, 2, 3, ...]
          .find((i) => votes[i] == max)
  }

  const indexMostVotes = maxVotesIndex() 

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <Anecdote 
        text={anecdotes[selected]}
        votes={votes[selected]}/>

      <button onClick={updateVotes}>vote</button>
      <button onClick={updateAnecdoteIndex}>next anecdote</button>

      <h1>Anecdote with most votes</h1>
      <Anecdote 
        text={anecdotes[indexMostVotes]}
        votes={votes[indexMostVotes]}/>
      </div>
  )
}

export default App