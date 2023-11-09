import { expect } from 'chai';
import request from 'supertest';
import { app } from '../../index.mjs';
import mongoose from 'mongoose';
import Book from '../../models/book_model.mjs';

const MONGO_URI = process.env.MONGO_URI;

describe('specificBook Route', () => {
    let server;
    let bookId;

    before(async function () {
        this.timeout(10000);

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
        bookId = savedBook._id.toString();
        console.log("bookId - ", bookId)
    });

    after(async function () {
        this.timeout(10000);
        server.close();
        await mongoose.connection.close();
    });

    it('should get a specific book by ID', (done) => {
        request(server)
            .get(`/books/${bookId}`)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('title', 'Test Book');
                done();
            });
    });

    it('should return an error if the book is not found', (done) => {
        const invalidBookId = 'ihgfcvbhuvghbjnbhvjn';
        request(server)
            .get(`/books/${invalidBookId}`)
            .expect(500)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body).to.have.property('error');
                done();
            });
    });
});
