import Book from '../models/book_model.mjs';

// Get a specific book by ID
const specificBook = ('/getbook/:id', async (req, res) => {
  try {
    const bookId = req.params.id;

    // Retrieve a specific book by ID
    const book = await Book.findById(bookId);

    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }

    res.status(200).json(book);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default specificBook;
