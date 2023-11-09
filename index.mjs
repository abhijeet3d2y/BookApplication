import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
dotenv.config();

import bookRoutes from "./routes/book_route.mjs";

export const app = express();
const PORT = process.env.PORT || 4002;
const MONGO_URI = process.env.MONGO_URI;

// Connect to MongoDB
mongoose.connect( MONGO_URI );

app.use(bodyParser.json());
app.use(express.json());

app.use('/', bookRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
