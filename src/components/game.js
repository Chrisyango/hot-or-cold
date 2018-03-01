import React from 'react';

import Header from './header';
import GuessSection from './guess-section';
import GuessCount  from './guess-count';
import GuessList from './guess-list';

export default class Game extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            currentNumber: Math.floor(Math.random() * 50),
            currentGuess: '',
            amountOfGuesses: 0,
            guessHistory: [],
            hotOrCold: '',
            feedback: 'Make your Guess!'
        }
    }

    showInstructions() {
        let overlay = document.getElementById('modal');
        overlay.style.zIndex = 1000;
        overlay.style.opacity = '1';
    }

    hideInstructions() {
        let overlay = document.getElementById('modal');
        overlay.style.zIndex = -1;
        overlay.style.opacity = '0';
    }

    newGame() {
        this.setState({
            currentNumber: Math.floor(Math.random() * 50),
            currentGuess: '',
            amountOfGuesses: 0,
            guessHistory: [],
            hotOrCold: '',
            feedback: 'Make your Guess!'
        })
    }

    updateCurrentGuess(value) {
        this.setState(Object.assign({}, this.state, {
            currentGuess: value,
        }))
    }

    checkCurrentGuess() {
        const currentGuess = this.state.currentGuess;
        const currentNumber = this.state.currentNumber;
        const guessHistory = this.state.guessHistory;
        const amountOfGuesses = this.state.amountOfGuesses;
        if (Number(currentGuess) === currentNumber) {
            this.setState({
                feedback: 'You win! Click New Game to play again!'
            })
        } else {
            this.setState({
                guessHistory: guessHistory.concat(currentGuess),
                amountOfGuesses: amountOfGuesses + 1
            })
            if (Math.abs(Number(currentGuess) - currentNumber) > 15) {
                this.setState({
                    feedback: 'Cold'
                })
            }
            if (Math.abs(Number(currentGuess) - currentNumber) <= 15) {
                this.setState({
                    feedback: 'Warm'
                })
            }
            if (Math.abs(Number(currentGuess) - currentNumber) <= 10) {
                this.setState({
                    feedback: 'Hot'
                })
            }
        }
    }

    render() {
        return (
            <div>
                <Header 
                    showInstructions={event => this.showInstructions()}
                    hideInstructions={event => this.hideInstructions()}
                    newGame={event => this.newGame()}
                />
                <GuessSection 
                    feedback={this.state.feedback} 
                    updateCurrentGuess={event => this.updateCurrentGuess(event.target.value)}
                    checkCurrentGuess={event => {
                                                    
                                                    this.checkCurrentGuess();
                                                }
                                        }
                />
                <GuessCount 
                    count={this.state.amountOfGuesses} 
                />
                <GuessList 
                    guesses={this.state.guessHistory} 
                />
            </div>
        );
    } 
}

