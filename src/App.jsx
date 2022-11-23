import { useState } from 'react'
import FlashcardList from './components/FlashcardList'

function App() {
  const [flashcards, setFlashcards] = useState(SAMPLE_FLASHCARDS)

  return (
    <div className="App">
      <FlashcardList flashcards={flashcards} />
    </div>
  )
}

const SAMPLE_FLASHCARDS = [
 {
  id: 1,
  question: 'What is 2 + 3?',
  answer: '4',
  options: [
    '2',
    '3',
    '4',
    '5'
  ]
 },
 {
  id: 1,
  question: 'Question 2?',
  answer: 'Answer',
  options: [
    'Answer',
    'Answer 2',
    'Answer 3',
    'Answer 4'
  ]
 }
]

export default App
