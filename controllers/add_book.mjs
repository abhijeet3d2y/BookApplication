import Book from '../models/book_model.mjs';

// Create a new book
const addbooks = async (req, res) => {
  try {
    console.log("req.body - ", req.body)
    const { title, author, summary, publication_date, genre } = req.body;

    if (!title || !author || !summary || !publication_date || !genre) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

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
};

export default addbooks;
