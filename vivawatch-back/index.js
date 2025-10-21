const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
const conn = require('./db/conn');

const authRoutes = require('./routes/auth');
const supportRoutes = require('./routes/support');
const paymentRoutes = require('./routes/payment');

const app = express();
const PORT = 5000;

app.use(bodyParser.json());
app.use(cors());

// rotas
app.use('/api', authRoutes);
app.use('/api', supportRoutes);
app.use('/api', paymentRoutes);

conn.sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log('Servidor rodando na porta 5000');
    });
  })
  .catch((error) => console.log(error));