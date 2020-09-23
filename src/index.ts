import express from "express";
import dotenv from "dotenv";
import { AddressInfo } from "net";
import { login } from "./endpoints/login";

dotenv.config();

const app = express();
app.use(express.json());


app.post('/login', login);

const server = app.listen(3002, () => {
    if (server) {
        const address = server.address() as AddressInfo;
        console.log(`Server is running in http://localhost: ${address.port}`);
    } else {
        console.error(`Failure upon starting server.`);
    }
});