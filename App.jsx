import { useEffect, useState } from 'react'
import './App.css'
//import Guess from './components/Guess.jsx'

const flashcards = [
  {front: "０", back: ["零", "れい"]},
  {front: "１", back: ["一", "いち"]},
  {front: "２", back: ["二", "に"]},
  {front: "３", back: ["三", "さん"]},
  {front: "４", back: ["四", "よん / し"]},
  {front: "５", back: ["五", "ご"]},
  {front: "６", back: ["六", "ろく"]},
  {front: "７", back: ["七", "なな / しち"]},
  {front: "８", back: ["八", "はち"]},
  {front: "９", back: ["九", "きゅう / く"]},
  {front: "１０", back: ["十", "じゅう"]},
  {front: "１００", back: ["百", "ひゃく"]},
  {front: "３００", back: ["三百", "さんびゃく"], irregular: true},
  {front: "６００", back: ["六百", "ろっぴゃく"], irregular: true},
  {front: "８００", back: ["八百", "はっぴゃく"], irregular: true},
  {front: "１,０００", back: ["千", "せん"]},
  {front: "３,０００", back: ["三千", "さんぜん"], irregular: true},
  {front: "４,０００", back: ["四千", "よんせん"]},
  {front: "７,０００", back: ["七千", "ななせん"]},
  {front: "８,０００", back: ["八千", "はっせん"], irregular: true},
  {front: "１０,０００", back: ["一万", "いちまん"]}
];

const Guess = ({ currentCard, guess, setGuess, result, setResult, flipCard }) => {

    const handleChange = (e) => {
        setGuess(e.target.value)
    };

    
    const validate = () => {
        const curr = flashcards[currentCard];
        const userGuess = guess.trim().toLowerCase().replace(/[|&;$%@"<>()+,.]/g,"");

        return curr.back.includes(userGuess); // if userGuess is in curr.back array, return true, otherwise false.
    };

    const submitGuess = (e) => {
        e.preventDefault();
        const isCorrect = validate();
        setResult(isCorrect);
    };

    return (
        <>
            <input className={result === null ? "" : result ? "correct" : "incorrect"} id="guess" name="guess" type="text" placeholder="Your Guess Here" value={guess} onChange={handleChange}></input>
            <button id="submit" type="submit" onClick={flipCard ? null : submitGuess}>Submit Guess</button>
            {/* {guess} */}
        </>
    );
};


function App() {

  const [currentCard, setCurrentCard] = useState(0);
  const [flipCard, setFlipCard] = useState(false);

  const [guess, setGuess] = useState("");
  const [result, setResult] = useState(null);

  const curr = flashcards[currentCard];

  const isFirstCard = currentCard === 0;
  const isLastCard = currentCard === flashcards.length - 1;


  const nextCard = () => {
    setFlipCard(false);
    //setCurrentCard((prev) => (prev+1) % flashcards.length); // % flashcards.length takes you to the first card if you try to go to the next card from the last card

    setCurrentCard((prev) => (prev+1));
    
    // reset input
    setGuess("");
    setResult(null);
  };
  const prevCard = () => {
    setFlipCard(false);
    //setCurrentCard((prev) => prev === 0 ? flashcards.length -1 : prev-1); // prev on first card sends you to last card

    setCurrentCard((prev) => prev-1);

    // reset input
    setGuess("");
    // reset correct/incorrect border
    setResult(null);
  };


  return (
    <>
      <h1>Learn to Count from 0 to 10,000 in Japanese!</h1>
      <h4>Blue cards indicate the pronounciation is irregular.</h4>
      <h4>Total Cards: {flashcards.length}</h4>
      
      <div className={`flash-card ${flipCard ? "flipped" : ""}`} id={`${curr.irregular === true ? "irregular" : ""}`} onClick={() => setFlipCard(!flipCard)}>
        <div className={`${flipCard ? "back" : "front"}`}>
          {flipCard ? curr.back[0] : curr.front}
          <br></br>
          {flipCard ? curr.back[1] : ""}
        </div>
      </div>

      <button onClick={prevCard} disabled={isFirstCard}>← 前 (ぜん)</button>
      <Guess currentCard={currentCard} guess={guess} setGuess={setGuess} result={result} setResult={setResult} flipCard = {flipCard} />
      <button onClick={nextCard} disabled={isLastCard}>次 (つぎ) →</button>
      
    </>
  )
}

export default App
