
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
dotenv.config();
import mongoose from 'mongoose';
import routes from './Routes/routes';

const app = express();
const PORT : number = Number(process.env.PORT) || 3030;

app.use(cors());
app.use(express.json());


mongoose.connect(process.env.MongoURl || '')
.then(()=>{ console.log(); console.log('Connected to MongoDB') })
.catch((err : mongoose.Error) => {
  console.error('Error connecting to MongoDB:', err);
});

app.use('/', routes);

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
