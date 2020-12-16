import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import resolvers from './resolvers';
import typeDefs from './schema';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import auth from '../auth';
import models from './models';
import cors from 'cors';

dotenv.config();

const app = express();
app.use(auth.checkHeaders);

//Configuraciones del archivo .env
const { DATABASE_URL, ACCESS_TOKEN_SECRET } = process.env;

mongoose.connect(DATABASE_URL, {
    useFindAndModify: false ,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then( _ => console.log('Database is running'));

const server = new ApolloServer({ 
    typeDefs, 
    resolvers,
    context: ({req}) => {
        // console.log("User ID: ", req.user)
        return {
            models,
            ACCESS_TOKEN_SECRET,
            user: req.user
        }
    } 
});

server.applyMiddleware({ app });
app.listen(5000, () => console.log(`🚀 Server ready at port 5000`));
