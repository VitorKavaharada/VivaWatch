const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');

require('dotenv').config();

const app = express();
const PORT = 5000;

const SECRET = process.env.JWT_SECRET;

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'viva_watch_db'
});

db.connect((err) => {

  if (err) {
    console.error('Erro ao conectar ao MySQL:', err);
    process.exit(1);
  }

  console.log('Conectado ao MySQL!');

});

app.use(bodyParser.json());
app.use(cors());

app.post('/signup', async (req, res) => {

  const { email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const query = 'INSERT INTO users (email, password) VALUES (?, ?)';

  db.query(query, [email, hashedPassword], (err) => {

    if (err) {
      console.log('Erro no signup:', err.message); 
      return res.status(500).json({ message: 'Erro ao registrar usuário' });
    }
    
    res.status(201).json({ message: 'Registrado!' });

  });
});

app.post('/login', async (req, res) => {

  const { email, password } = req.body;
  const query = 'SELECT * FROM users WHERE email = ?';
  
  db.query(query, [email], async (err, results) => {

    if (err) {
      console.log('Erro no login:', err.message);
      return res.status(500).json({ message: 'Erro no servidor, tente novamente mais tarde' });
    }

    const user = results[0];
    if (!user) {
      return res.status(401).json({ message: 'Credenciais inválidas' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Credenciais inválidas' });
    }

    const token = jwt.sign({ email: user.email }, SECRET, { expiresIn: '1h' });
    res.json({ token });

  });
});

app.listen(PORT, () => console.log(`Servidor em http://localhost:${PORT}`));