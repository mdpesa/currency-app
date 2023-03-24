import { cleanup, render, screen } from '@testing-library/react';
import ResultBox from './ResultBox';
import '@testing-library/jest-dom/extend-expect';

const testCasesFromPLN = [
  { amount: 100, expected: 'PLN 100.00 = $28.57' },
  { amount: 20, expected: 'PLN 20.00 = $5.71' },
  { amount: 200, expected: 'PLN 200.00 = $57.14' },
  { amount: 345, expected: 'PLN 345.00 = $98.57' },
];

const testCasesFromUSD = [
  { amount: 100, expected: '$100.00 = PLN 350.00' },
  { amount: 200, expected: '$200.00 = PLN 700.00' },
  { amount: 150, expected: '$150.00 = PLN 525.00' },
  { amount: 345, expected: '$345.00 = PLN 1,207.50' },
];

describe('Component ResultBox', () => {
  it('should render without crashing', () => {
    render(<ResultBox from='PLN' to='USD' amount={100} />);
  });

  for (const testObj of testCasesFromPLN)
    it('should render proper info about conversion when PLN -> USD', () => {
      render(<ResultBox from='PLN' to='USD' amount={testObj.amount} />);
      const output = screen.getByTestId('output');
      expect(output).toHaveTextContent(testObj.expected);
    });
  cleanup();

  for (const testObj of testCasesFromUSD)
    it('should render proper info about conversion when USD -> PLN', () => {
      render(<ResultBox from='USD' to='PLN' amount={testObj.amount} />);
      const output = screen.getByTestId('output');
      expect(output).toHaveTextContent(testObj.expected);
    });
  cleanup();

  it('should render proper info about conversion when the same currency', () => {
    render(<ResultBox from='PLN' to='PLN' amount={100} />);
    const output = screen.getByTestId('output');
    expect(output).toHaveTextContent('PLN 100.00 = PLN 100.00');
  });

  it('should render proper info about conversion when negative amount', () => {
    render(<ResultBox from='PLN' to='USD' amount={-100} />);
    const output = screen.getByTestId('output');
    expect(output).toHaveTextContent('Wrong value...');
  });
});
