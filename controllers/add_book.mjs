import Book from '../models/book_model.mjs';

// Create a new book
const addbooks = ('/addbooks', async (req, res) => {
  try {
    console.log("req.body - ", req.body)
    const { title, author, summary, publication_date, genre } = req.body;

    const newBook = new Book({
      title,
      author,
      summary,
      publication_date,
      genre,
    });

    await newBook.save();

    res.status(201).json(newBook);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default addbooks;
