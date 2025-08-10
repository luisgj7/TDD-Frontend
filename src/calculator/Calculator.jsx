import { useState } from "react";
import { evaluate } from "mathjs";
import './calculator.css';

export const padOptions = [
    [7,8,9],
    [4,5,6],
    [1,2,3],
    [0]
];

export const operations = ['+', '-', '*', '/'];
export const equalSign = '=';

const isOperator = (t) => operations.includes(t);

const canAppend = (prev, next) => {
    if (!prev) return next !== "." ? true : true;
    const last = prev.slice(-1);

    if (isOperator(last) && isOperator(next)) return false;

    if (next === "." && (last === "." || /\.\d*$/.test(prev.split(/[+\-*/]/).pop() || ""))) return false;
    return true;
};

export const Calculator = () => {
    const [value, setValue] = useState('');
    const [error, setError] = useState("");
    const handleAppend = (token) => () => {
        setError("");
        setValue((prev) => error ? token : (canAppend(prev, token) ? prev + token : prev));
    };

    const handleClear = () => {
        setError("");
        setValue("");
    };

    const handleDelete = () => {
        setError("");
        setValue((prev) => prev.slice(0, -1));
    };

    const handleEqual = () => {
        if (!value) return;
        try {
            const result = evaluate(value);
            setValue(String(result));
            setError("");
        } catch (e) {
            setError("Invalid expression");
        }
    };

    return (
        <section className="calc">
            <h1 className="calc__title">Calculator</h1>

            <div className={`calc__display ${error ? "calc__display--error" : ""}`}>
                <input
                    className="calc__input"
                    value={error ? error : value}
                    readOnly
                    aria-label="calculator display"
                />
            </div>

            <div className="calc__grid" role="grid" aria-label="calculator keypad">
                <div className="calc__nums">
                    <button className="btn btn--util" onClick={handleClear} aria-label="clear all">AC</button>
                    <button className="btn btn--util" onClick={handleDelete} aria-label="delete">DEL</button>
                    <div aria-hidden />

                    {padOptions.map((row, i) => (
                        <div key={i} className="calc__row" role="row">
                            {row.map((token) => (
                                <button
                                    key={token}
                                    className="btn"
                                    onClick={handleAppend(token)}
                                    aria-label={`digit ${token}`}
                                >
                                    {token}
                                </button>
                            ))}
                        </div>
                    ))}

                    <button className="btn btn--equals" onClick={handleEqual} aria-label="equals">
                        {equalSign}
                    </button>
                </div>

                <div className="calc__ops">
                    {operations.map(op => (
                        <button
                            key={op}
                            className="btn btn--op"
                            onClick={handleAppend(op)}
                            aria-label={`operator ${op}`}
                        >
                            {op}
                        </button>
                    ))}
                </div>
            </div>
        </section>
    );
}

// Fist version of calculator component using TDD
/*
export const Calculator = () => {
    const [value, setValue] = useState('');
    const handleClick = (number) => () => {
        setValue(value.concat(number));
    }
    return (
        <section>
            <h1> Calculator </h1>
            <input value={value} readOnly />
            <div role='grid'>
                { padOptions.map((row, index) => (
                    <div key={index} role='row'>
                        {
                            row.map(number => (
                                <button onClick={handleClick(number)} key={number}>
                                    {number}
                                </button>
                            ))}
                    </div>
                ))}
                {
                    operations.map((operation) => (
                        <button onClick={handleClick(operation)} key={operation}>{operation}</button>
                    ))
                }
                <button onClick={() => setValue(evaluate(value))}>{ equalSign }</button>
            </div>
        </section>
    )
}
 */