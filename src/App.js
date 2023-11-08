import styled , { createGlobalStyle } from 'styled-components';
import logo from './assets/logo.svg'
import dollar from './assets/icon-dollar.svg'
import person from './assets/icon-person.svg'
import { useState, useEffect } from 'react'

const TIP_OPTIONS = [5, 10, 15, 25, 50]

// Define the font styles
const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Space Mono', monospace;
  }
`;

const AppContainer = styled.div`
  --primary: hsl(172, 67%, 45%);
  --light: hsl(185, 41%, 84%);
  --dark: hsl(183, 100%, 15%);
  --grayish: hsl(184, 14%, 56%);
  --light-grayish: hsl(189, 41%, 97%);
  --white: hsl(0, 0%, 100%);
  --error: hsl(0, 95%, 76%);
  min-height: 100vh;
  text-align: center;
  background: var(--light);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const AppLogo = styled.img`
  margin: 3rem auto;
`
const AppBody = styled.div`
  width:45%;
  height: 50vh;
  border-radius: 20px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
  padding: 30px;
  font-size: calc(10px + 2vmin);
  background: var(--white);
  box-shadow: 1px 19px 19px 5px rgba(17,18,20,0.03);
  -webkit-box-shadow: 1px 19px 19px 5px rgba(17,18,20,0.03);
  -moz-box-shadow: 1px 19px 19px 5px rgba(17,18,20,0.03);
  @media (max-width: 1440px) {
    grid-template-rows: unset;
    grid-template-columns: unset;
    height: auto;
    width: auto;
  }
`
const Board = styled.div`
  border-radius: 10px;
  display: grid;
  @media (max-width: 1440px) {
    gap: 25px;
  }
  @media (max-width: 600px) {
    gap: 25px;
  }

`

const TipWrap = styled.div`
  width: 100%;
  display: grid;
  grid-template-rows: repeat(2, 35%);
  grid-template-columns: repeat(3, 30%);
  gap: 15px;
  @media (max-width: 600px) { 
    grid-template-columns: 1fr 1fr;
    gap: 10px;
  }
`

const TipButton = styled.button`
  width: 100%;
  border: none;
  height: 40px;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center; 
  justify-content: center; 
  font-family: inherit;
  @media (max-width: 600px) {
    height: 50px;
  }
`

const CustomTip = styled(TipButton)`
  font-size: 20px;
  font-weight: bolder;
  color: var(--dark);
`

const ActiveTip = styled(TipButton)`
  font-size: 20px;
  font-weight: 700;
  font-family: inherit;
  background: var(--dark);
  color: var(--white);
  @media (hover: hover) {
    &:hover {
      transition: all 0.3s ease-in-out 0.2s;
      background: var(--light);
      color: var(--dark);
    }
  }
  
  
  ${props =>
    props.$isActive &&
    `
    background: var(--primary);
    color: var(--dark);
  `}
 
`

// operate relative
const InputForm = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
`

const InputTitle = styled.div`
  font-weight: 700;
  font-size: 1rem;
  color: var(--grayish);
`

const Input = styled.input`
  font-size: 1.5rem;
  color: var(--dark);
  font-weight: bolder;
  padding: 10px;
  &::placeholder {
    color: var(--grayish);
    font-weight: 700;
  }
`

const OperateInput = styled(Input)`
  width:100%;
  box-sizing: border-box;
  height: 40px;
  border-radius: 6px;
  border: transparent;
  background: var(--light-grayish);
  font-family: inherit;
  text-align: end;
  &:focus,
  &:active,
  &:focus-visible {
    border: 2px solid var(--primary);
    outline: none;
  }

  ${props =>
    props.$isBill ?
    `
    background-image: url(${dollar});
    background-position: 15px 10px;
    background-repeat: no-repeat;
    padding-left: 30px;
    ` : `
    background-image: url(${person});
    background-position: 15px 10px;
    background-repeat: no-repeat;
    padding-left: 30px;
    `}

  ${props =>
    props.$hasError &&
    `
    &:focus,
    &:active,
    &:focus-visible {
      border: 2px solid var(--error);
      outline: none;
    }
    `
  }

  @media (max-width: 600px) {
    height: 50px;
    background-position: 15px 15px;
  }
`

const ErrorMessage = styled.span`
  position: absolute;
  right: 0;
  font-family: inherit;
  font-size: 1rem;
  color: var(--error);
`

// result relative
const ResultWrap = styled.div`
  border-radius: 10px;
  display: grid;
  padding: 30px;
  background: var(--dark);
  grid-template-rows: repeat(3, auto);
  gap: 30px;
`
const ResultInformation = styled.div`
  display: flex;
  justify-content: space-between;
`

const Result = styled.div`
  color: var(--primary);
  font-weight: bold;
  font-size: 2rem;
  height: 1em;
  display: flex;
`

const MainFont = styled.div`
  color:var(--white);
  font-weight: 700;
  font-size: 1rem;
` 

const NoteFont = styled.div`
  color: var(--grayish);
  font-weight: lighter;
  font-size: 1rem;
  text-align: left;
`

const ResultButton = styled.button`
    height: 40px;
    width: 100%;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    padding: 8px 0;
    align-self: end;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    font-weight: 700;
    font-family: inherit;
    background: var(--primary);
    color: var(--dark);
    &:disabled {
      cursor: not-allowed;
      opacity: .2;
    }
    @media (hover: hover) {
      &:hover {
        transition: all 0.3s ease-in-out 0.2s;
        background: var(--light);
        color: var(--dark);
      }
    }
    
    
`

function App() {
  let [bill, setBill] = useState('')
  let [percentage, setPercentage] = useState('')
  let [number, setNumber] = useState('')

  function handleReset() {
    setBill('')
    setPercentage('')
    setNumber('')
  }

  // Verify status of reset button
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
    <AppContainer>
      <GlobalStyle />
      <AppLogo src={logo}  alt="logo" />
      <AppBody>
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
      </AppBody>
    </AppContainer>
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
    <Board>
      <InputField
        title="Bill"
        value={bill}
        onChange={setBill}
        integer={false} />
      <InputForm>
        <InputTitle>Select Tip %</InputTitle>
        <TipWrap>
          {TIP_OPTIONS.map(option => (
            <Tip
              key={option}
              value={option}
              percentage={percentage}
              handleClickTip={() => {
                setPercentage(option)
                setShowCustom(false)
              }}
              />
          ))}
          {!showCustom && <CustomTip
            onClick={() => {
              setShowCustom(true)
              setPercentage('')
            }}>
              Custom
          </CustomTip>}
          {showCustom &&
            <OperateInput
              type="number-input"
              value={percentage.toString()}
              onChange={(e) => {
                let val = e.target.value
                val = val.replace(/[^0-9]/g, '');
                setPercentage(Number(val));}}
              placeholder='0'
              min="0"
              />}
        </TipWrap>
      </InputForm>

      <InputField
        title="Number of People"
        value={number}
        onChange={setNumber}
        integer={true}
        hasError={hasError}/>
    </Board>
  );
}

function InputField({ value, title, onChange, integer, hasError = false }) {

  return (
    <InputForm>
      <InputTitle>{title}</InputTitle>
      <OperateInput
        $isBill={title === 'Bill'}
        $hasError={hasError}
        type="number"
        onChange={(e) => {
          let val = e.target.value;
          if (integer) {
            val = val.replace(/[^0-9]/g, '');
          }
          onChange(Number(val));}}
        value={value}
        placeholder="0"
        min="0"
        data-testid={title === 'Bill' ? 'bill-input' : 'number-input'}/>
      { hasError &&
        <ErrorMessage>Can't be zero</ErrorMessage>}
    </InputForm>
  );
}

function Tip({value, percentage, handleClickTip}) {
  let isActive = percentage === value
  return (
      <ActiveTip 
        $isActive={isActive}
        onClick={handleClickTip}
        data-testid={`tip${value}-input`}
        >
          {value}%
      </ActiveTip>
  )
}

function ResultInfo({ title, value }) {
  return (
    <ResultInformation>
      <div>
        <MainFont>{title}</MainFont>
        <NoteFont>/ person</NoteFont>
      </div>
      <Result>
        <div data-testid={`${title.toLowerCase()}-per-person`}>${value}</div>
      </Result>
    </ResultInformation>
  );
}

function TipResult({handleReset, result, disabled}) {
  return (
    <ResultWrap>
      <ResultInfo 
        title="Tip Amount" 
        value={result.tipAmount}></ResultInfo>
      <ResultInfo 
        title="Total" 
        value={result.total}></ResultInfo>
      <ResultButton
        onClick={handleReset}
        disabled={disabled}
        data-testid="reset-button">RESET</ResultButton>
    </ResultWrap>
  )
}

export default App;
