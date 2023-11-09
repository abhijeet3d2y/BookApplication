import { expect } from 'chai';
import request from 'supertest';
import mongoose from 'mongoose';
import { app } from '../../index.mjs';
import Book from '../../models/book_model.mjs'; // Replace with the actual path to your book model
const MONGO_URI = process.env.MONGO_URI;

describe('Book Model', () => {
  before(async () => {
    // Connect to the MongoDB database
    await mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
  });

  after(async () => {
    // Disconnect from the MongoDB database after all tests
    await mongoose.connection.close();
  });

  it('should create a new book', async () => {
    const bookData = {
      title: 'Sample Book',
      author: ['Sample Author'],
      summary: 'Sample Summary',
      publication_date: new Date('2023-01-01'),
      genre: ['Sample Genre'],
    };

    const createdBook = await Book.create(bookData);

    expect(createdBook).to.be.an('object');
    expect(createdBook.title).to.equal('Sample Book');
    expect(createdBook.author).to.deep.equal(['Sample Author']);
    expect(createdBook.summary).to.equal('Sample Summary');
    expect(createdBook.publication_date).to.be.an.instanceOf(Date);
    expect(createdBook.genre).to.deep.equal(['Sample Genre']);
  });

  it('should retrieve a book by ID', async () => {
    const bookData = {
      title: 'Sample Book',
      author: ['Sample Author'],
      summary: 'Sample Summary',
      publication_date: new Date('2023-01-01'),
      genre: ['Sample Genre'],
    };

    const createdBook = await Book.create(bookData);
    const bookId = createdBook._id;

    const retrievedBook = await Book.findById(bookId);

    expect(retrievedBook).to.be.an('object');
    expect(retrievedBook.title).to.equal('Sample Book');
    expect(retrievedBook.author).to.deep.equal(['Sample Author']);
    expect(retrievedBook.summary).to.equal('Sample Summary');
    expect(retrievedBook.publication_date).to.be.an.instanceOf(Date);
    expect(retrievedBook.genre).to.deep.equal(['Sample Genre']);
  });
});
