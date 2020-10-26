import express from 'express';
import cors from 'cors';
import ApiRouter from './routers/ApiRestRouter';

const server = express();

server.use(express.json());
server.use(cors());

server.use('/api', ApiRouter);

export default server;
