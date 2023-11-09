import { expect } from 'chai';
import request from 'supertest';
import { app } from '../../index.mjs';
import mongoose from 'mongoose';
import BookModel from '../../models/book_model.mjs';

const MONGO_URI = process.env.MONGO_URI;

describe('updateBook Route', () => {
    let server;
    let bookId;

    before(async function () {
        this.timeout(10000);

        await mongoose.connect(MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        server = app.listen(3000);

        const newBook = new BookModel({
            title: 'Test Book',
            author: 'Test Author',
            summary: 'Test Summary',
            publication_date: '2023-01-01',
            genre: 'Test Genre',
        });
        const savedBook = await newBook.save();
        bookId = savedBook._id.toString();
    });

    after(async function () {
        this.timeout(10000);
        server.close();
        await mongoose.connection.close();
    });

    it('should update the contents of a book by ID', (done) => {
        const newContents = {
            title: 'Updated Title',
            author: ['Updated Author'], 
            summary: 'Updated Summary',
            publication_date: '2024-01-01T00:00:00.000Z', 
            genre: ['Updated Genre'], 
        };

        request(server)
            .put(`/books/${bookId}`)
            .send({ newContents })
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('title', 'Updated Title');
                expect(res.body).to.have.property('author').to.deep.equal(['Updated Author']);
                expect(res.body).to.have.property('summary', 'Updated Summary');
                expect(res.body).to.have.property('publication_date').to.be.a('string');
                expect(res.body).to.have.property('genre').to.deep.equal(['Updated Genre']);
                done();
            });
    });


    it('should return an error if the book is not found', (done) => {
        const invalidBookId = ' gadbhhshhshhs';
        const newContents = {
            title: 'Updated Title',
            author: 'Updated Author',
            summary: 'Updated Summary',
        };

        request(server)
            .put(`/books/${invalidBookId}`)
            .send({ newContents })
            .expect(500)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body).to.have.property('error');
                done();
            });
    });
});
