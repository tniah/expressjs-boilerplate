import express from 'express';
import routes from './routes/v1';
import {errorConverter, errorHandler} from './middlewares/error';

const app = express();

// parse json request body
app.use(express.json());

// parse urlencoded request body
// app.use(express.urlencoded({ extended: true }));

// v1 api routes
app.use('/api/v1', routes);

// convert error to ApiError
app.use(errorConverter)

// handle error
app.use(errorHandler);

export default app;