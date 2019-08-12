import '@babel/polyfill';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import trimmer from 'express-body-trimmer';
import session from 'express-session';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger';
import auth from './routes/auth';
import bucketList from './routes/bucketlist';

const app = express();

dotenv.config();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({ secret: process.env.SESSION_SECRET }));
app.use(trimmer());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api/v1/auth', auth);
app.use('/api/v1/bucketlists', bucketList);


app.get('/', (req, res) => res.status(200).json({
  status: 200,
  message: 'Welcome To My Bucket List',
}));

app.all('*', (req, res) => res.status(404).json({
  status: 404,
  error: 'The specified route does not exist',
}));

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});

export default app;
