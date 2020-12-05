import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import resolvers from './resolvers';
import typeDefs from './schema';
import context from './context'
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const { DATABASE_URL } = process.env;

mongoose.connect(DATABASE_URL, {
    useFindAndModify: false ,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then( _ => console.log('Database is running'));

const server = new ApolloServer({ typeDefs, resolvers, context })

const app = express();

server.applyMiddleware({ app });

app.listen(3000, () => console.log('Server on port 3000'));