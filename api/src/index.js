import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import resolvers from './resolvers';
import typeDefs from './schema';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { decodeToken } from "./services";

dotenv.config();

const { DATABASE_URL } = process.env;

mongoose.connect(DATABASE_URL, {
    useFindAndModify: false ,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then( _ => console.log('Database is running'));

const server = new ApolloServer({ typeDefs, resolvers, 
    context: async ({ req }) => {
    let authToken = null;
    let user = null;

    try {
      authToken = req.headers.authorization;

      if (authToken) {
        user = await decodeToken(authToken);
      }
    } catch (e) {
      console.warn(`No se pudo autenticar el token: ${authToken}`);
    }
    // console.log(authToken)
    return {
      authToken,
      user
    };
  } })

const app = express();

server.applyMiddleware({ app });

app.listen(3000, () => console.log('Server on port 3000'));