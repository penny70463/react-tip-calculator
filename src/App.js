import './App.css';
import logo from './assets/logo.svg'
import { useState, useEffect } from 'react'

const TIP_OPTIONS = [5, 10, 15, 25, 50]
function App() {
  let [bill, setBill] = useState('')
  let [percentage, setPercentage] = useState('')
  let [number, setNumber] = useState('')
  function handleReset() {
    setBill('')
    setPercentage('')
    setNumber('')
  }

  function disabled() {
    return isNaN(bill) || isNaN(number) || Number(bill) === 0 || Number(number) === 0
  }

  function calculate() {
    let total = bill*(1 + percentage / 100) / number
    let tipAmount = bill*(percentage / 100) / number
    return { tipAmount: format(tipAmount), total: format(total) }
  }

  function format(val) {
    if(Number.isNaN(val) || val === Infinity) return '0.00'
    return parseFloat(val.toFixed(2))
  }

  return (
    <div className="App">
      <img className="App-logo" src={logo}  alt="logo" />
      <div className="App-body">
        <InputSection
            bill={bill}
            number={number}
            percentage={percentage}
            setBill={setBill}
            setPercentage={setPercentage}
            setNumber={setNumber}
            />
        <TipResult
            handleReset={handleReset}
            disabled={disabled()}
            result={calculate()}
            />
      </div>
    </div>
  );
}

function InputSection({ bill, setBill, percentage, setPercentage, number, setNumber }) {
  let [showCustom, setShowCustom] = useState(false)
  let [hasError, setHasError] = useState(false)
  useEffect(() => {
    if(bill > 0 && !(number > 0)) {
      setHasError(true)
    } else {
      setHasError(false)
    }
  },[bill, number])

  return (
    <div className='board'>
      <InputField
        title="Bill"
        value={bill}
        onChange={setBill}
        integer={false} />
      <div className="input">
        <div className="input-title">Select Tip %</div>
        <div className="tip-wrap">
        {TIP_OPTIONS.map(option => (
          <Tip
            key={option}
            value={option}
            percentage={percentage}
            setPercentage={setPercentage}
            />
        ))}
        {!showCustom && <button
          onClick={() => {
            setShowCustom(true)
            setPercentage('')
          }}
          className='tip-btn custom'>
            Custom
        </button>}
        {showCustom &&
          <input
            className="operate-input"
            type="number"
            value={percentage.toString()}
            onChange={(e) => {
              setPercentage(Number(e.target.value));}}
            placeholder='0'
            min="0"
            />}
      </div>
      </div>

      <InputField
        title="Number of People"
        value={number}
        onChange={setNumber}
        integer={true}
        hasError={hasError}/>
    </div>
  );
}

function InputField({ value, title, onChange, integer, hasError = false }) {
  let className = title === 'Bill' ? 'bill' : 'number';
  let inputClassName = hasError ? `operate-input ${className} error` : `operate-input ${className}`

  return (
    <div className="input">
      <div className="input-title">{title}</div>
      <input
        className={inputClassName} 
        type="number"
        onChange={(e) => {
          let val = e.target.value;
          if (integer) {
            val = val.replace(/[^0-9]/g, '');
          }
          onChange(Number(val));}}
        value={value}
        placeholder="0"
        min="0"/>
      { hasError &&
        <span className="error-message">Can't be zero</span>}
    </div>
  );
}

function Tip({value, percentage, setPercentage}) {
  let isActive = percentage === value
  return (
      <button 
        className={`tip-btn tip-btn-with-style ${isActive && 'active'}`}
        onClick={() => setPercentage(value)}
        >
          {value}%
      </button>
  )
}

function ResultInfo({ title, value }) {
  return (
    <div className="result-info">
      <div>
        <div className="main-font">{title}</div>
        <div className="note-font">/ person</div>
      </div>
      <div className="result">
        <div>${value}</div>
      </div>
    </div>
  );
}

function TipResult({handleReset, result, disabled}) {
  return (
    <div className='result-wrap board'>
      <ResultInfo title="Tip Amount" value={result.tipAmount}></ResultInfo>
      <ResultInfo title="Total" value={result.total}></ResultInfo>
      <button
        className="result-btn result-btn-with-style"
        onClick={handleReset}
        disabled={disabled}>RESET</button>
    </div>
  )
}

export default App;
