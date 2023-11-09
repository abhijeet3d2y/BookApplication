import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({
  title: String,
  author: [String],
  summary: String,
  publication_date: Date,
  genre: [String],
});

export default mongoose.model('Book', bookSchema);
