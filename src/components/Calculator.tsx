import React, { useState, useEffect } from 'react';
import Display from './Display';
import Button from './Button';
import './Calculator.css'; // для стилей
import { evaluateExpression } from '../utils/calculator';

const Calculator: React.FC = () => {
    const [expression, setExpression] = useState<string>('');

    const handleButtonClick = (value: string) => {
        if (value === '=') {
            try {
                const result: number = evaluateExpression(expression);
                if (result) {
                    setExpression(result.toString())
                } else {
                    setExpression("Ошибка");
                }
            } catch (e) {
                setExpression('Error');
            }
        } else if (value === 'C' || value === 'ESC') {
            setExpression('');
        } else {
            setExpression((prev) => prev + value);
        }
    };

    const handleKeyPress = (event: KeyboardEvent) => {
        const { key } = event;

        if (key >= '0' && key <= '9') {
            setExpression((prev) => prev + key);
        } else if (['+', '-', '*', '/', '%', '(', ')', '√'].includes(key)) {
            setExpression((prev) => prev + key);
        } else if (key === 'Enter') {
            try {
                const result: number = evaluateExpression(expression);
                if (result) {
                    setExpression(result.toString())
                } else {
                    setExpression("Ошибка");
                }
            } catch (e) {
                setExpression('Error');
            }
        } else if (key === 'Escape') {
            setExpression('');
        } else if (key === 'Backspace') {
            setExpression((prev) => prev.slice(0, -1));
        } else if (key === '.') {
            setExpression((prev) => prev + key);
        }
    };

    useEffect(() => {
        window.addEventListener('keydown', handleKeyPress);
        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        };
    }, [expression]);

    return (
        <div className="calculator">
            <Display value={expression} />
            <div className="buttons">
                {['C', '√', '%', '/'].map((label) => (
                    <Button key={label} label={label} onClick={() => handleButtonClick(label)} />
                ))}
                {['7', '8', '9', '*'].map((label) => (
                    <Button key={label} label={label} onClick={() => handleButtonClick(label)} />
                ))}
                {['4', '5', '6', '-'].map((label) => (
                    <Button key={label} label={label} onClick={() => handleButtonClick(label)} />
                ))}
                {['1', '2', '3', '+'].map((label) => (
                    <Button key={label} label={label} onClick={() => handleButtonClick(label)} />
                ))}
                {['00', '0', '.', '='].map((label) => (
                    <Button key={label} label={label} onClick={() => handleButtonClick(label)} />
                ))}
            </div>
        </div>
    );
};

export default Calculator;
