import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import trimmer from 'express-body-trimmer';
import session from 'express-session';
import auth from './routes/auth';
import bucketList from './routes/bucketlist';

const app = express();

dotenv.config();

app.use(trimmer());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({ secret: process.env.SESSION_SECRET }));

app.use('/api/v1/auth', auth);
app.use('/api/v1/bucketlists', bucketList);


app.get('/', (req, res) => res.status(200).json({
  status: 200,
  message: 'Welcome To My Bucket List',
}));

app.use((req, res, next) => {
  const error = new Error('The specified route does not exist');
  error.status = 404;
  next(error);
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});

export default app;
