const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');
const nodemailer = require('nodemailer');
const multer = require('multer');

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

// Configuração do Multer para armazenamento em memória
const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|pdf/;
  const extname = allowedTypes.test(file.originalname.toLowerCase().split('.').pop());
  const mimetype = allowedTypes.test(file.mimetype);
  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb(new Error('Apenas PDF, PNG ou JPG são permitidos!'));
  }
};

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: fileFilter
});

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

app.post('/api/send-support-email', upload.single('attachment'), async (req, res) => {
  const { name, phone, email, category, description } = req.body;
  const attachment = req.file;

  if (!name || !phone || !email || !category || !description) {
    return res.status(400).json({ message: 'Todos os campos obrigatórios devem ser preenchidos' });
  }

  // Configuração do transporter do Nodemailer
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false, 
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    },
    tls: { rejectUnauthorized: false } 
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: 'suporte@vivawatch.com',
    subject: `Nova Mensagem de Suporte: ${category}`,
    html: `
      <h3>Detalhes do Suporte</h3>
      <p><strong>Nome:</strong> ${name}</p>
      <p><strong>Celular:</strong> ${phone}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Categoria:</strong> ${category}</p>
      <p><strong>Descrição:</strong> ${description}</p>
    `,
    attachments: attachment ? [{
      filename: attachment.originalname,
      content: attachment.buffer
    }] : []
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Mensagem enviada com sucesso!' });
  } catch (error) {
    console.error('Erro ao enviar email:', error);
    res.status(500).json({ message: 'Erro ao enviar mensagem. Tente novamente.' });
  }
});

app.listen(PORT, () => console.log(`Servidor em http://localhost:${PORT}`));