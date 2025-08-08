import { useState } from 'react'


const Button = ({text, onClick}) => {
  return <button onClick={onClick}>{text}</button>
}

const Feedback = ({onGoodClicked, onNeutralClicked, onBadClicked}) => {
  return (
    <>
      <h1>give feedback</h1>
      <Button text="good" onClick={onGoodClicked} />
      <Button text="neutral" onClick={onNeutralClicked} />
      <Button text="bad" onClick={onBadClicked} />
    </>
  )
}

const StatisticLine = ({label, value}) => {
  return (
    <tr>
      <td>{label}</td> 
      <td>{value}</td>
    </tr>
    ) 
}
const Statistics = ({goodScore, neutralScore, badScore}) => {
  const totalScore = goodScore + neutralScore + badScore
  
  ///// Helper functions
  /// averageScore() => number (possibly NaN if totalScore is 0)
  /// produces the average score, 1 for "good" score, -1 for "bad" score
  /// the average is [1 * good] + [-1 * bad] / [total score]  
  const averageScore = () => (goodScore - badScore) / totalScore
  
  /// positivePercentage() => number (possibly NaN if totalScore is 0)
  /// produce the percentage of "good" score over the total score
  const positivePercentage = () => (goodScore / totalScore) * 100
    

  if (totalScore == 0) {
    return (
      <>
        <h1>statistics</h1>
        <p>No feedback given</p>
      </>
    )
  } else {
    return (
      <>
      <h1>statistics</h1>
      <div>
        <table>
          <tbody>
            <StatisticLine label="good" value={goodScore}/>
            <StatisticLine label="neutral" value={neutralScore}/>
            <StatisticLine label="bad" value={badScore}/>
            <StatisticLine label="all" value={totalScore}/>
            <StatisticLine label="average" value={averageScore()}/>
            <StatisticLine label="positive" value={`${positivePercentage()} %`}/>
          </tbody>
        </table>
      </div>
      </>

    )
  }
}
const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClicked = () => setGood(good + 1)
  const handleNeutralClicked = () => setNeutral(neutral + 1)
  const handleBadClicked = () => setBad(bad + 1)
  
  return (
    <div>
      <Feedback 
        onGoodClicked={handleGoodClicked}
        onNeutralClicked={handleNeutralClicked}
        onBadClicked={handleBadClicked}
        />
      <Statistics goodScore={good} neutralScore={neutral} badScore={bad}/>
    </div>
  )
}

export default App