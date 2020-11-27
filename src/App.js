import { Component } from 'react';
import './App.css';

/* Inspired by REACT formation : https://openclassrooms.com/fr/courses/4664381-realisez-une-application-web-avec-react-js/6734471-entrainez-vous-en-creant-un-jeu-du-pendu */

/* TODO : draw a random word with an API and detect the number of underscore needed */
/* TODO : center the last line of the keyboard */
/* TODO BONUS : Make a score system */
/* TODO BONUS : Make a two player mode */
/* TODO BONUS : make a real hangman with SVG */

const LETTERS = [
  'A', 'Z', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P',
  'Q', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'M',
  'W', 'X', 'C', 'V', 'B', 'N',
]

class App extends Component {
  state = {
    initialWordToFind: "TOTOABC",
    currentWordToFind: "_______",
    nbTry: 0,
    lettersGuessed: [],
    won: false
  }

  letterClicked(letter, lettersGuessed, initialWordToFind, nbTry) {
    lettersGuessed.push(letter)
    nbTry++;
    let currentWordToFind = initialWordToFind.replace(/\w/g, (letter) => (lettersGuessed.includes(letter) ? letter : '_'))
    this.setState({ currentWordToFind: currentWordToFind, nbTry: nbTry, won: !currentWordToFind.includes('_') })
  }

  render() {
    const { initialWordToFind, currentWordToFind, nbTry, lettersGuessed, won } = this.state
    return (
      <div className="App">
        {!won &&
          <div className="nbTry">Number of tries : {nbTry}</div>
        }
        <div className="currentWordToFind">
          {currentWordToFind}
        </div>
        {won &&
          <div className="victoryWrapper">
            <h2>VICTORY</h2>
            <p> You've found the word with {nbTry} attempts</p>
            <button onClick={() => (this.setState({ initialWordToFind: "TOTOABC", currentWordToFind: "_______", nbTry: 0, lettersGuessed: [], won: false }))}>RETRY</button>
          </div>
        }
        {!won &&
          <div className="keyboard">
            {/* if letter is already clicked, we add disabled class and remove the onClick function*/}
            {LETTERS.map((letter, index) =>
              <p className={lettersGuessed.includes(letter) ? 'disabledKey' : undefined} key={index}
                onClick={lettersGuessed.includes(letter) ? null : () => this.letterClicked(letter, lettersGuessed, initialWordToFind, nbTry)}>
                {letter}
              </p>)}
          </div>
        }
      </div>
    )
  }
}

export default App;