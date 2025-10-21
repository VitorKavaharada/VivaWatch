const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

class UserController {
    
  static async signup(req, res) {

    const { email, password } = req.body;

    try {
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return res.status(400).json({ message: 'Email já registrado' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      await User.create({ email, password: hashedPassword });
      res.status(201).json({ message: 'Registrado!' });
    } catch (error) {
      console.error('Erro no signup:', error.message);
      res.status(500).json({ message: 'Erro ao registrar usuário' });
    }
  }

  static async login(req, res) {

    const { email, password } = req.body;

    try {
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(401).json({ message: 'Credenciais inválidas' });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: 'Credenciais inválidas' });
      }

      const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.json({ token });
    } catch (error) {
      console.error('Erro no login:', error.message);
      res.status(500).json({ message: 'Erro no servidor, tente novamente mais tarde' });
    }
  }
}

module.exports = UserController;