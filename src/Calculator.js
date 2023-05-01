import React, { useState } from 'react';
import styled from 'styled-components';

const CalculatorWrapper = styled.div`
  background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.buttonText};
`;

const Button = styled.button`
  background-color: ${({ theme }) => theme.buttonBackground};
  color: ${({ theme }) => theme.buttonText};
`;

const Calculator = () => {
    const [currentValue, setCurrentValue] = useState('');
    const [previousValue, setPreviousValue] = useState('');
    const [operation, setOperation] = useState(null);

    const handleNumberClick = (value) => {
        setCurrentValue(currentValue + value);
    };

    const handleDecimalClick = () => {
        if (!currentValue.includes('.')) {
            setCurrentValue(currentValue + '.');
        }
    };

    const handleOperationClick = (value) => {
        if (value === 'Del') {
            setCurrentValue(currentValue.slice(0, -1));
        } else {
            if (currentValue !== '') {
                setOperation(value);
                setPreviousValue(currentValue);
                setCurrentValue('');
            }
        }
    };

    const handleEqualClick = () => {
        if (previousValue && currentValue && operation) {
            const a = parseFloat(previousValue);
            const b = parseFloat(currentValue);

            let result;
            switch (operation) {
                case '+':
                    result = a + b;
                    break;
                case '-':
                    result = a - b;
                    break;
                case '×':
                    result = a * b;
                    break;
                case '÷':
                    result = a / b;
                    break;
                default:
                    return;
            }

            setCurrentValue(result.toFixed(12).toString());
            setPreviousValue('');
            setOperation(null);
        }
    };

    const handleClearClick = () => {
        setCurrentValue('');
        setPreviousValue('');
        setOperation(null);
    };

    return (
        <CalculatorWrapper>
            <div className="display">{currentValue || '0'}</div>
            <div className="button-row">
                <Button onClick={() => handleNumberClick('7')}>7</Button>
                <Button onClick={() => handleNumberClick('8')}>8</Button>
                <Button onClick={() => handleNumberClick('9')}>9</Button>
                <Button onClick={() => handleOperationClick('Del')}>Del</Button>
            </div>
            <div className="button-row">
                <Button onClick={() => handleNumberClick('4')}>4</Button>
                <Button onClick={() => handleNumberClick('5')}>5</Button>
                <Button onClick={() => handleNumberClick('6')}>6</Button>
                <Button onClick={() => handleOperationClick('+')}>+</Button>
            </div>
            <div className="button-row">
                <Button onClick={() => handleNumberClick('1')}>1</Button>
                <Button onClick={() => handleNumberClick('2')}>2</Button>
                <Button onClick={() => handleNumberClick('3')}>3</Button>
                <Button onClick={() => handleOperationClick('-')}>-</Button>
            </div>
            <div className="button-row">
                <Button onClick={handleDecimalClick}>.</Button>
                <Button onClick={() => handleNumberClick('0')}>0</Button>
                <Button onClick={() => handleOperationClick('÷')}>÷</Button>
                <Button onClick={() => handleOperationClick('×')}>×</Button>
            </div>
            <div className="button-row-last">
                <Button onClick={handleClearClick}>Reset</Button>
                <Button onClick={handleEqualClick}>=</Button>
            </div>
        </CalculatorWrapper>
    );
};

export default Calculator;