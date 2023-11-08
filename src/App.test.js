import { render, fireEvent, screen } from '@testing-library/react';
import TipCalculator from './App';

test('Calculate tip per person and total per person', () => {
  render(<TipCalculator />);

  // test calculation
  const billInput = screen.queryByTestId('bill-input');
  const numberInput = screen.queryByTestId('number-input');
  const tipInput = screen.queryByTestId('tip15-input');
  
  fireEvent.change(billInput, { target: { value: '142.55' } });
  fireEvent.change(numberInput, { target: { value: '5' } });
  fireEvent.click(tipInput)
  
  const tipPerPersonElement = screen.queryByTestId('tip amount-per-person');
  const totalPerPersonElement = screen.queryByTestId('total-per-person');
  
  expect(tipPerPersonElement.textContent).toBe('$4.28');
  expect(totalPerPersonElement.textContent).toBe('$32.79');

  // test reseting
  const resetButton = screen.queryByTestId('reset-button');

  fireEvent.click(resetButton)

  expect(billInput.value).toBe('')
  expect(numberInput.value).toBe('')
  expect(tipPerPersonElement.textContent).toBe('$0.00');
  expect(totalPerPersonElement.textContent).toBe('$0.00');
});