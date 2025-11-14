import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styles from './Login.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Erro ao fazer login');
      }

      const data = await res.json();
      localStorage.setItem('token', data.token);
      setMessage('Logado com sucesso!');
      if (onLoginStatusChange) onLoginStatusChange(true);
      navigate('/');
    } catch (err) {
      console.log('Error:', err.message);
      setMessage(err.message);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <label htmlFor="username">Username</label>
            <input
              type="email"
              id="username"
              placeholder="Digite seu username"
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
          <button type="submit" className={styles.btnLogin}>Login</button>
          <p className={styles.forgotPassword}>
            <Link to="#">Esqueceu a senha?</Link>
          </p>
          <div className={styles.socialLogin}>
            <p>Ou faça login com:</p>
            <div className={styles.socialIcons}>
              <a href="#" className={styles.facebook}>
                <FontAwesomeIcon icon={faFacebook} />
              </a>
              <a href="#" className={styles.google}>
                <FontAwesomeIcon icon={faGoogle} />
              </a>
            </div>
          </div>
          <p className={styles.signupLink}>
            Ainda não tem conta? <Link to="/register">Cadastre-se</Link>
          </p>
        </form>
        {message && <p className={styles.message}>{message}</p>}
      </div>
    </div>
  );
};

export default Login;