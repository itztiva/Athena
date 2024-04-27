import Express from "express"
const express = Express();
import mongoose from "mongoose"
import dotenv from 'dotenv'
import { pathToFileURL } from 'url';
import path from 'path'
import fs from 'fs'
import bodyParser from "body-parser";
import log from './functions/structs/log.js'
const __dirname = path.dirname(new URL(import.meta.url).pathname);
dotenv.config({ path: path.resolve(__dirname, '..', "config", ".env") });

mongoose.set("strictQuery", false);
mongoose.connect("mongodb://wtf.solarisfn.org:27017/Athena", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

express.set("trust proxy", true);
express.use(Express.json());
express.use(bodyParser.json());
express.use(Express.urlencoded({ extended: true }));

async function loadHandlers(dir) {
    fs.readdirSync(dir).forEach(async (file) => {
        const absolutePath = path.join(dir, file);
        if (fs.statSync(absolutePath).isDirectory()) {
            await loadHandlers(absolutePath);
        } else if (file.endsWith(".js")) {
            const service = await import(pathToFileURL(absolutePath));
            express.use(service.default);
        }
    });
}

loadHandlers(path.join("src/handlers"));

express.get("/", async (_, res) => {
    res.send("Hello everyone!")
});

express.listen(443, () => {
    log.backend("started")
});

