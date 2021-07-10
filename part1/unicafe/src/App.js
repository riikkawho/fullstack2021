import React, { useState } from 'react'

const Button = (props) => (
  <button onClick={props.handleClick}>{props.text}{props.value}</button>
)

const Statistics = (props) => {
  if (props.votes === 0) return <p><b>No feedback given</b></p>
  return (
    <div>
      <h1>Statistics</h1>
      <table>
        <tbody>
          <Statistic text="Good" count={props.good}/>
          <Statistic text="Neutral" count={props.neutral}/>
          <Statistic text= "Bad" count={props.bad}/>
          <Statistic text="All votes" count={props.votes}/> 
          <Statistic text="Average" count={props.value/props.votes}/>
          <Statistic text="Positive" count={props.positive}/>
        </tbody>
      </table>
    </div>
  )
}


const Statistic = (props) => {
  return (
    <tr><td>{props.text}</td><td>{props.count}</td></tr>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [value, setValue] = useState(0)
  const votes = good + neutral + bad
  const positive = good / votes *100 +" %"
  const onClickGood = () => {
    setGood(good+1)
    setValue(value+1)
  }
  const onClickBad = () => {
    setBad(bad+1)
    setValue(value-1)
  }

  return (
    <div>
      <h1>Give feedback</h1>
        <Button handleClick={onClickGood} text="Good"/>
        <Button handleClick={() => setNeutral(neutral+1)} text="Neutral"/>
        <Button handleClick={onClickBad} text="Bad"/>
  
        <Statistics 
          votes={votes}
          good={good}
          neutral={neutral}
          bad={bad}
          value={value}
          positive={positive}/>
    </div>
  )
}

export default App
