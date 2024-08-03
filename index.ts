import express from 'express';
import bodyParser from 'body-parser';
import connectDB from './db/db';
import userRoutes from './routes/userRoutes';

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(bodyParser.json());

app.use('/api/users', userRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});