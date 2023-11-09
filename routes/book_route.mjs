import express from 'express';
import getAllBooks from '../controllers/get_all_book.mjs';
import addbooks from '../controllers/add_book.mjs';
import specificBook from '../controllers/get_specific_book.mjs';
import updateBook from '../controllers/update_book.mjs';
import deleteBook from '../controllers/delete_book.mjs';

const router = express.Router();

// Create a new book
router.post('/books', addbooks);

// Get a list of all books
router.get('/books', getAllBooks)

// Get details of a specific book by ID
router.get('/books/:id', specificBook)

// Update a book's details
router.put('/books/:id', updateBook)

// Delete a book
router.delete('/books/:id', deleteBook)

export default router;
