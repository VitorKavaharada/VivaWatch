import React, { useState } from 'react';
import styles from './Auth.module.css';
import { useNavigate } from 'react-router-dom';

const Auth = ({ onClose,onLoginStatusChange  }) => {
  const [isSignup, setIsSignup] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = isSignup ? 'http://localhost:5000/api/signup' : 'http://localhost:5000/api/login';

    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Erro ao processar');
      }

      const data = await res.json();
      if (isSignup) {
        setMessage('Registrado! Agora faça login.');
        setIsSignup(false);
      } else {
        localStorage.setItem('token', data.token);
        setMessage('Logado com sucesso!');
        onClose();
        if (onLoginStatusChange) onLoginStatusChange(true); 
        navigate('/'); // Redireciona para a home 
      }
    } catch (err) {
      setMessage(err.message);
    }
  };

  return (
    <div className={styles.modal} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeBtn} onClick={onClose}>X</button>
        <h2>{isSignup ? 'Registro' : 'Login'}</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">{isSignup ? 'Registrar' : 'Entrar'}</button>
        </form>
        <p>{message}</p>
        <button onClick={() => setIsSignup(!isSignup)}>
          {isSignup ? 'Já tem conta? Faça login' : 'Criar nova conta'}
        </button>
      </div>
    </div>
  );
};

export default Auth;