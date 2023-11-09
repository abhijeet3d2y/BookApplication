import { expect } from 'chai';
import request from 'supertest';
import { app } from '../../index.mjs';
import mongoose from 'mongoose';
import Book from '../../models/book_model.mjs';

const MONGO_URI = process.env.MONGO_URI;
console.log("MONGO_URI - ", MONGO_URI);

describe('deleteBook Route', () => {
  let server; 
  let bookId;

  before(async function () {
    this.timeout(10000); // Increase the timeout to 10 seconds (adjust as needed)

    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    server = app.listen(3000);

    const newBook = new Book({
      title: 'Test Book',
      author: 'Test Author',
      summary: 'Test Summary',
      publication_date: '2023-01-01',
      genre: 'Test Genre',
    });
    const savedBook = await newBook.save();
    console.log("savedBook._id - ", savedBook._id);
    bookId = savedBook._id.toString();
  });

  after(async function () {
    this.timeout(10000);
    server.close();
    await mongoose.connection.close();
  });

  it('should delete a book', (done) => {
    request(server)
      .delete(`/books/${bookId}`)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.text).to.equal('Book is deleted');
        done();
      });
  });

  it('should return an error if the book is not found', (done) => {
    const invalidBookId = 'bsbdhbskhdbhsbd';
    request(server)
      .delete(`/books/${invalidBookId}`)
      .expect(500)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.have.property('error');
        done();
      });
  });
});
