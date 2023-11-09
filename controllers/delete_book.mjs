import Book from '../models/book_model.mjs';

// Delete a specific book by ID
const deleteBook = ('/deletebook/:id', async (req, res) => {
  try {
    const bookId = req.params.id;

    const book = await Book.findById(bookId);

    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }

    // Delete book from database
    await Book.findByIdAndDelete(bookId);

    res.status(200).send("Book is deleted"); // Respond with a 204 No Content status to indicate successful deletion
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default deleteBook;
