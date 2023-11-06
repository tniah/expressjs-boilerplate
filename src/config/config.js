import Joi from 'joi';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({path: path.join(__dirname, '../../.env')});

const envSchema = Joi.object()
  .keys({
    MONGODB_URL: Joi.string().required().description('Mongo database URL'),
  }).unknown();

const {value: envVars, error} = envSchema.prefs({errors: {label: 'key'}}).validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

export const appConfig = {
  mongoose: {
    url: envVars.MONGODB_URL,
    options: {},
  }
};