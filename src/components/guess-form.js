import React from 'react';

import './guess-form.css';

export default function GuessForm(props) {
    return (
        <form>
            <input 
                type="text" 
                name="userGuess" 
                id="userGuess"
                className="text" 
                maxLength="3" 
                autoComplete="off"
                placeholder="Enter your Guess" 
                required 
                onChange={props.updateCurrentGuess}
            />
            <input 
                type="submit" 
                id="guessButton" 
                className="button" 
                name="submit" 
                value="Guess"
                onClick={event => {
                                event.preventDefault();
                                props.checkCurrentGuess();
                            }
                        }
            />
        </form>
    );
};

