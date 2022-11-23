import Flashcard from "./FlashCard"

const FlashcardList = ({ flashcards }) => {
  return (
    <div className="card-grid">
        {flashcards.map(flashcard => {
            return <Flashcard flashcard={flashcard} key={flashcard.id} />
        })}
    </div>
  )
}

export default FlashcardList