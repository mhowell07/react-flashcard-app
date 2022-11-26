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

  const decodeString = (str) => {
    const textArea = document.createElement('textarea')
    textArea.innerHTML = str
    return textArea.value
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.get('https://opentdb.com/api.php', {
      params: {
        amount: amountEl.current.value,
        category: categoryEl.current.value
      }
    })
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
  }

  return (
    <div className="App">
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
      <div className="container">
        <FlashcardList flashcards={flashcards} />
      </div>
    </div>
  )
}

export default App
