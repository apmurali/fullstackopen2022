import { useState } from 'react'
//defining a component for displaying each line of statistic
const StatisticLine = ({text, value}) => {
  return(
    <div>
      <tr>
      <td style={{ "width": "58px"}}> {text}</td> <td> {value}</td>
      </tr>
    </div>
  )
}
//defining a distinct statistics component

const Statistics = ({good, neutral, bad}) => {
  const total = good+bad+neutral
  const average = ((total) /3).toFixed(1)
  const positive = (good * 100 / (total)).toFixed(1) || 0 // or zero so that we dont get NaNs
  if (total ===0) return (<div>No feedback given</div>)
  return(
      <div>
        <table>
  <StatisticLine text="good" value={good} />
  <StatisticLine text="neutral" value={neutral} />
  <StatisticLine text="bad" value={bad} />
  <StatisticLine text="average" value={average} />
  <StatisticLine text="positive" value={positive} />
</table>
  </div>
  )
}
const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  

  return (
    <div>
      <h2>give feedback</h2>
      <Button handleClick={() => {setGood(good + 1); console.log(good);}} text="good" />
      <Button handleClick={() => {setNeutral(neutral + 1); console.log(neutral);}} text="neutral" />
      <Button handleClick={() => {setBad(bad + 1); console.log(bad);}} text="bad" />
      <h2>statistics</h2>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App