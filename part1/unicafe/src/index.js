import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Statistics = ({ good, bad, neutral }) => {
  if (good + bad + neutral === 0) return <p>No Feedback given</p>;
  return (
    <div>
      <p>Good: {good}</p>
      <p>Bad: {bad}</p>
      <p>Neutral: {neutral}</p>
      <p>All: {good + bad + neutral}</p>
      <p>Average: {(good - bad) / (good + bad + neutral)}</p>
      <p>Positive: {(good / (good + bad + neutral)) * 100}</p>
    </div>
  );
};

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const incGood = () => {
    setGood(good + 1);
  };
  const incBad = () => {
    setBad(bad + 1);
  };
  const incNeutral = () => {
    setNeutral(neutral + 1);
  };

  return (
    <div>
      <h1>Give Feedback</h1>
      <button onClick={incGood}>Good</button>
      <button onClick={incBad}>Bad</button>
      <button onClick={incNeutral}>Neutral</button>
      <h1>Statistics</h1>
      <Statistics good={good} bad={bad} neutral={neutral} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
