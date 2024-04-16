import React, { useState } from 'react';
import { Amplify } from 'aws-amplify';
import { Authenticator, withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import awsExports from './aws-exports';
import './App.css';

Amplify.configure(awsExports);

function BmiCalculator() {
    const [heightValue, setHeightValue] = useState('');
    const [weightValue, setWeightValue] = useState('');
    const [bmiValue, setBmiValue] = useState('');
    const [bmiMessage, setBmiMessage] = useState('');

    const calculateBmi = () => {
        if (heightValue && weightValue) {
            const heightInMeters = heightValue / 100;
            const bmi = (weightValue / (heightInMeters * heightInMeters)).toFixed(2);
            setBmiValue(bmi);

            let message = '';
            if (bmi < 18.5) {
                message = 'You are Underweight';
            } else if (bmi >= 18.5 && bmi < 25) {
                message = 'You are Normal weight';
            } else if (bmi >= 25 && bmi < 30) {
                message = 'You are Overweight';
            } else {
                message = 'You are Obese';
            }
            setBmiMessage(message);
        } else {
            setBmiValue('');
            setBmiMessage('');
        }
    };

    return (
        <div className="container">
            <h1>BMI Calculator</h1>
            <div className="input-container">
                <label htmlFor="height">Enter Your Height (cm):</label>
                <input
                    type="number"
                    id="height"
                    value={heightValue}
                    onChange={(e) => setHeightValue(e.target.value)}
                />
            </div>
            <div className="input-container">
                <label htmlFor="weight">Enter Your Weight (kg):</label>
                <input
                    type="number"
                    id="weight"
                    value={weightValue}
                    onChange={(e) => setWeightValue(e.target.value)}
                />
            </div>
            <button className="calculate-btn" onClick={calculateBmi}>
                Click to Calculate BMI
            </button>
            {bmiValue && bmiMessage && (
                <div className="result">
                    <p>
                        Your BMI: <span className="bmi-value">{bmiValue}</span>
                    </p>
                    <p>
                        Result: <span className="bmi-message">{bmiMessage}</span>
                    </p>
                </div>
            )}
        </div>
    );
}

function App() {
    return (
        <div className="App">
            <Authenticator>
                {({ signOut }) => (
                    <main>
                        <header className='App-header'>
                            <BmiCalculator />
                            <button
                                onClick={signOut}
                                style={{
                                    margin: '20px',
                                    fontSize: '0.8rem',
                                    padding: '5px 10px',
                                    marginTop: '20px'
                                }}
                            >
                                Sign Out
                            </button>
                        </header>
                    </main>
                )}
            </Authenticator>
        </div>
    );
}

export default withAuthenticator(App);
