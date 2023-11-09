import BookModel from '../models/book_model.mjs';

// Update the contents of a book by ID
const updateBook = ('/updatebook/:id', async (req, res) => {
    try {
        const bookId = req.params.id;
        const { newContents } = req.body;

        const book = await BookModel.findById(bookId);
        console.log("book - ",book)

        if (!book) {
            return res.status(404).json({ error: 'Book not found' });
        }

        // Update the contents of the book
        for (const key in newContents) {
            if (key in book) {
                book[key] = newContents[key];
            }
        }
        // console.log(" new book - ",book)

        await book.save();

        res.status(200).json(book);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default updateBook;
