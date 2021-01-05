import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import resolvers from './resolvers';
import typeDefs from './schema';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import auth from '../auth';
import models from './models';
import bodyParser from 'body-parser'
dotenv.config();

const app = express();

app.use(auth.checkHeaders);
app.use(bodyParser.json({limit: '10mb', extended: true}))
app.use(bodyParser.urlencoded({limit: '10mb', extended: true}))

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
        return {
            models,
            ACCESS_TOKEN_SECRET,
            user: req.user
        }
    } 
});

server.applyMiddleware({ app });
app.listen(5000, () => console.log(`🚀 Server ready at port 5000`));
