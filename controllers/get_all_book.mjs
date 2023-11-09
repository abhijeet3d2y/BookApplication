import Book from '../models/book_model.mjs'

// Get all books
const getAllBooks = ('/getbooks', async (req, res) => {
  try {
    // Retrieve all books from the database
    const books = await Book.find();
    console.log("books - ",books)

    res.status(200).json(books);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default getAllBooks;
