import React, { useState } from 'react';
import styled from 'styled-components';

const Display = styled.div`
    background-color: ${({ theme }) => theme.backgroundDisplay};
    color: ${({ theme }) => theme.colorDisplay};
`;

const CalculatorWrapper = styled.div`
    background-color: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.buttonText};
`;

const Button = styled.button`
    background-color: ${({ theme }) => theme.buttonBackground};
    color: ${({ theme }) => theme.buttonText};
    box-shadow: ${({ theme }) => theme.btnBoxShadow};
`;

const ButtonResDel = styled.button`
    background-color: ${({ theme }) => theme.buttonResDelBackground};
    color: ${({ theme }) => theme.buttonTextResDel};
    box-shadow: ${({ theme }) => theme.btnBoxShadowResDel};
`;

const ButtonEqual = styled.button`
    background-color: ${({ theme }) => theme.buttonEqualBackground};
    color: ${({ theme }) => theme.buttonTextEqual};
    box-shadow: ${({ theme }) => theme.btnBoxShadowEqual};
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

            setCurrentValue(result);
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
        <section className='calc-container'>
            <Display className='display'>{currentValue || '0'}</Display>
            <CalculatorWrapper className='calc-buttons'>
                <div className="button-row">
                    <Button
                        className="calc-button"
                        onClick={() => handleNumberClick('7')}
                    >7</Button>
                    <Button
                        className="calc-button"
                        onClick={() => handleNumberClick('8')}
                    >8</Button>
                    <Button
                        className="calc-button"
                        onClick={() => handleNumberClick('9')}
                    >9</Button>
                    <ButtonResDel
                        className="calc-button small-text"
                        onClick={() => handleOperationClick('Del')}
                    >DEL</ButtonResDel>
                </div>
                <div className="button-row">
                    <Button
                        className="calc-button"
                        onClick={() => handleNumberClick('4')}
                    >4</Button>
                    <Button
                        className="calc-button"
                        onClick={() => handleNumberClick('5')}
                    >5</Button>
                    <Button
                        className="calc-button"
                        onClick={() => handleNumberClick('6')}
                    >6</Button>
                    <Button
                        className="calc-button"
                        onClick={() => handleOperationClick('+')}
                    >+</Button>
                </div>
                <div className="button-row">
                    <Button
                        className="calc-button"
                        onClick={() => handleNumberClick('1')}
                    >1</Button>
                    <Button
                        className="calc-button"
                        onClick={() => handleNumberClick('2')}
                    >2</Button>
                    <Button
                        className="calc-button"
                        onClick={() => handleNumberClick('3')}
                    >3</Button>
                    <Button
                        className="calc-button"
                        onClick={() => handleOperationClick('-')}
                    >-</Button>
                </div>
                <div className="button-row">
                    <Button
                        className="calc-button"
                        onClick={handleDecimalClick}
                    >.</Button>
                    <Button
                        className="calc-button"
                        onClick={() => handleNumberClick('0')}
                    >0</Button>
                    <Button
                        className="calc-button"
                        onClick={() => handleOperationClick('÷')}
                    >÷</Button>
                    <Button
                        className="calc-button"
                        onClick={() => handleOperationClick('×')}
                    >×</Button>
                </div>
                <div className="button-row-last">
                    <ButtonResDel
                        className="calc-button small-text"
                        onClick={handleClearClick}
                    >RESET</ButtonResDel>
                    <ButtonEqual
                        className="calc-button small-text"
                        onClick={handleEqualClick}
                    >=</ButtonEqual>
                </div>
            </CalculatorWrapper>
        </section>
    );
};

export default Calculator;