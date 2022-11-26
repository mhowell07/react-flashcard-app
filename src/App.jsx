import { useState, useEffect, useRef } from 'react'

// libraries
import axios from 'axios'

// custom components
import FlashcardList from './components/FlashcardList'

function App() {
  const [flashcards, setFlashcards] = useState([])
  const [categories, setCategories] = useState([])

  const categoryEl = useRef();
  const amountEl = useRef();

  useEffect(() => {
    axios.get('https://opentdb.com/api_category.php')
    .then(res => {
      setCategories(res.data.trivia_categories)
    })
  }, [])

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

  const handleSubmit = (e) => {
    e.preventDefault();

  }

  return (
    <>
      <form className="header" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor='category'>Category</label>
          <select id="category" ref={categoryEl}>
            {categories.map(category => {
              return <option value={category.id} key={category.id}>{category.name}</option>
            })}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="amount">Number of Questions</label>
          <input 
            type="number" 
            id="amount" 
            min="1" 
            step="1" 
            defaultValue={10} 
            ref={amountEl} 
          />
        </div>
        <div className="form-group">
          <button className="btn">Generate</button>
        </div>
      </form>
      <div className="App">
        <FlashcardList flashcards={flashcards} />
      </div>
    </>
  )
}

export default App
