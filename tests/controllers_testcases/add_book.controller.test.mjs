import { expect } from 'chai';
import request from 'supertest';
import { app } from '../../index.mjs';
import mongoose from 'mongoose';
const MONGO_URI = process.env.MONGO_URI;
console.log("MONGO_URI - ", MONGO_URI);

describe('addbooks Route', () => {

  let server = app.listen(3000);

  it('should add a new book', (done) => {
    request(server)
      .post('/books')
      .send({
        title: 'Temp Book',
        author: 'Temp Author',
        summary: 'Temp Summary',
        publication_date: '2023-01-01',
        genre: 'Temp Genre',
      })
      .expect(201)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('title', 'Temp Book');
        done();
      });
  });

  it('should handle validation errors', (done) => {
    request(server)
      .post('/books')
      .send({})
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.have.property('error');
        done();
      });
  });
});
