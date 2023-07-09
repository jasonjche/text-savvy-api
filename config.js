const dotenv = require('dotenv');
const OpenAI = require('openai');
const express = require('express');
const cors = require('cors');
const session = require('express-session');

dotenv.config();

const { Configuration, OpenAIApi } = OpenAI;
const configuration = new Configuration({
    organization: 'org-nG55UrIJBArh3cNhcpw0Tfrv',
    apiKey: process.env.OPENAI_SECRET_KEY,
});
const openai = new OpenAIApi(configuration);

const app = express();
app.use(cors());
app.use(express.json());
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true
}));

module.exports = { openai, app };
