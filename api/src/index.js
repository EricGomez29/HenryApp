import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import resolvers from './resolvers';
import typeDefs from './schema';
import context from './context'
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import isAuth from './middleware/is-auth';
import cookieParser from "cookie-parser";

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

// app.use(cookieParser());

// app.use((req, _, next) => {
//   const accessToken = req.cookies["access-token"];
//   console.log(req.cookie)
//   try {
//     const data = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
//     (req).userId = data.userId;
//   } catch {}
//   next();
// });

// app.use(isAuth)
server.applyMiddleware({ app });

app.listen(5000, () => console.log('Server on port 5000'));
