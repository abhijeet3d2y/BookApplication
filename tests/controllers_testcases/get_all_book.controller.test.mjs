import { expect } from 'chai';
import request from 'supertest';
import { app } from '../../index.mjs';
import mongoose from 'mongoose';

const MONGO_URI = process.env.MONGO_URI;

describe('getAllBooks Route', () => {
  let server;

  before(async function () {
    this.timeout(10000); 

    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    server = app.listen(3000);
  });

  after(async function () {
    this.timeout(10000);
    server.close();
    await mongoose.connection.close();
  });

  it('should get all books', (done) => {
    request(server)
      .get('/books')
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.be.an('array');
        done();
      });
  });

  it('should handle server error', (done) => {
    mongoose.connection.close();

    request(server)
      .get('/books')
      .expect(500)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.have.property('error');
        done();
      });
  });
});
