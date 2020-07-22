import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Statistic = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
);

const Statistics = ({ good, bad, neutral }) => {
  if (good + bad + neutral === 0) return <p>No Feedback given</p>;
  return (
    <div>
      <table>
        <tbody>
          <Statistic text="Good" value={good} />
          <Statistic text="Bad" value={bad} />
          <Statistic text="Neutral" value={neutral} />
          <Statistic text="All" value={good + bad + neutral} />
          <Statistic
            text="Average"
            value={(good - bad) / (good + bad + neutral)}
          />
          <Statistic
            text="Positive"
            value={(good / (good + bad + neutral)) * 100}
          />
        </tbody>
      </table>
    </div>
  );
};

const Button = ({ text, clickHandler }) => (
  <button onClick={clickHandler}>{text}</button>
);

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
      <Button text="Good" clickHandler={incGood} />
      <Button text="Bad" clickHandler={incBad} />
      <Button text="Neutral" clickHandler={incNeutral} />
      <h1>Statistics</h1>
      <Statistics good={good} bad={bad} neutral={neutral} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
