import express from 'express';
import cors from 'cors';
import bcrypt from 'bcrypt';
import knex from 'knex';
import handleRegister from './controllers/register.js';
import handleSignIn from './controllers/signin.js';
import handleGetProfile from './controllers/profile.js';
import { handleUpdateEntries, handleAPICall } from './controllers/image.js';

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

const db = knex({
  client: 'pg',
  connection: {
    host: '127.0.0.1',
    user: 'presh',
    password: '',
    database: 'smartbrain'
  }
});

app.get('/', (req, res)=> {res.send('this is working')});

app.post('/signin', (req, res) => { handleSignIn(req, res, db, bcrypt)});

app.post('/register', (req, res) => { handleRegister(req, res, db, bcrypt) });

app.get('/profile/:id',(req, res) => { handleGetProfile(req, res, db)});

app.put('/image', (req, res) => { handleUpdateEntries(req, res, db)});

app.post('/imageurl', (req, res) => { handleAPICall(req, res)})


app.listen(3000, () => {console.log('app is running on port 3000')});