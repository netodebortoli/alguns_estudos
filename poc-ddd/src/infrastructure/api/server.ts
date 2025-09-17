import dotenv from 'dotenv';
import { app } from './express';
import express from 'express'

/**
    Dotenv is a dependency module that loads environment variables from a .env file into process.env.
 */
dotenv.config();

const serverPort: number = Number(process.env.PORT) || 3000;

app.listen(serverPort, () => {
    console.log(`Server is listening on port ${serverPort}`)
});