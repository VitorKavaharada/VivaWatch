import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styles from './Register.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons';

const Register = ({ onLoginStatusChange }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('As senhas não coincidem');
      return;
    }
    try {
      const res = await fetch('http://localhost:5000/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Erro ao registrar');
      }

      setMessage('Registrado! Agora faça login.');
      navigate('/login');
    } catch (err) {
      setMessage(err.message);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h2>Cadastro</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <label htmlFor="email">E-mail</label>
            <input
              type="email"
              id="email"
              placeholder="Digite seu e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="password">Senha</label>
            <input
              type="password"
              id="password"
              placeholder="Digite sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="confirm-password">Confirmar Senha</label>
            <input
              type="password"
              id="confirm-password"
              placeholder="Confirme sua senha"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className={styles.btnRegister}>Registrar</button>
          <div className={styles.socialLogin}>
            <p>Ou registre-se com:</p>
            <div className={styles.socialIcons}>
              <a href="#" className={styles.facebook}>
                <FontAwesomeIcon icon={faFacebook} />
              </a>
              <a href="#" className={styles.google}>
                <FontAwesomeIcon icon={faGoogle} />
              </a>
            </div>
          </div>
          <p className={styles.loginLink}>
            Já tem uma conta? <Link to="/login">Faça login</Link>
          </p>
        </form>
        {message && <p className={styles.message}>{message}</p>}
      </div>
    </div>
  );
};

export default Register;