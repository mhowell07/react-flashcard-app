import { useState, useEffect } from 'react'

// libraries
import axios from 'axios'

// custom components
import FlashcardList from './components/FlashcardList'

function App() {
  const [flashcards, setFlashcards] = useState([])

  useEffect(() => {
    axios.get('https://opentdb.com/api.php?amount=10')
    .then(res => {
      setFlashcards(res.data.results.map((questionItem, index) => {
        const answer = decodeString(questionItem.correct_answer)
        const options = [
          ...questionItem.incorrect_answers.map(a => decodeString(a)), 
          answer
        ]
        return {
          id: `${index}-${Date.now()}`,
          question: decodeString(questionItem.question),
          answer: questionItem.correct_answer,
          options: options.sort(() => Math.random() - .5)
        }
      }))
      console.log(res.data)
      
    })
  }, [])

  const decodeString = (str) => {
    const textArea = document.createElement('textarea')
    textArea.innerHTML = str
    return textArea.value
  }

  return (
    <div className="App">
      <FlashcardList flashcards={flashcards} />
    </div>
  )
}

export default App
