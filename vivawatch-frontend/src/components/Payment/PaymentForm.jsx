import React, { useState } from 'react';
import styles from './Payment.module.css'; 
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [cpf, setCpf] = useState('');
  const [plan, setPlan] = useState('basic');
  const [cep, setCep] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [neighborhood, setNeighborhood] = useState('');
  const [street, setStreet] = useState('');
  const [streetNumber, setStreetNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [paymentError, setPaymentError] = useState(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [processing, setProcessing] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);
    setPaymentError(null);

     // Valor com base no plano(modificar depois)
    let amount;
    if (plan === 'basic'){
       amount = 2990; 
    }else if(plan === 'premium'){
      amount = 4990;
    }else if (plan === 'enterprise'){
      amount = 9990;
    }

    try {
      //Payment Intent
      const response = await fetch('http://localhost:5000/api/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount, plan, cpf }), 
      });

      if (!response.ok) {
        throw new Error('Erro ao criar Payment Intent');
      }

      const { clientSecret } = await response.json();

      // Confirma o pagamento com o Stripe
      const { error } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: { name, email },
        },
      });

      if (error) {
        setPaymentError(error.message);
      } else {
        setPaymentSuccess(true);

        setName('');
        setEmail('');
        setCpf('');
        setPlan('basic');
        setCep('');
        setState('');
        setCity('');
        setNeighborhood('');
        setStreet('');
        setStreetNumber('');
        elements.getElement(CardElement).clear(); 
      }
    } catch (err) {
      setPaymentError(err.message || 'Erro ao processar pagamento. Verifique os dados e tente novamente.');
    } finally {
      setProcessing(false);
    }
  };

  const fetchAddress = async (cepValue) => {
    const cleanCep = cepValue.replace(/\D/g, '');
    if (cleanCep.length !== 8) {
      setError('CEP deve conter 8 dígitos');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`);
      const data = await response.json();

      if (data.erro) {
        setError('CEP não encontrado');
        setState('');
        setCity('');
        setNeighborhood('');
        setStreet('');
      } else {
        setState(data.uf);
        setCity(data.localidade);
        setNeighborhood(data.bairro);
        setStreet(data.logradouro);
      }
    } catch (err) {
      setError('Erro ao buscar CEP. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

   // Função para Formatar o CPF 
  const formatCpf = (value) => {
    const clean = value.replace(/\D/g, '');
    if (clean.length === 11) {
      return clean.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    }
    return value;
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className={styles.inputGroup}>
        <label htmlFor="name">Nome Completo</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className={styles.inputGroup}>
        <label htmlFor="email">E-mail</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className={styles.inputGroup}>
        <label htmlFor="cpf">CPF</label>
        <input
          type="text"
          id="cpf"
          value={cpf}
          onChange={(e) => setCpf(formatCpf(e.target.value))}
          placeholder="000.000.000-00"
          maxLength={14}
          required
        />
      </div>
      <div className={styles.formRow}>
        <div className={styles.inputGroup}>
          <label htmlFor="cep">CEP</label>
          <input
            type="text"
            id="cep"
            value={cep}
            onChange={(e) => {
              setCep(e.target.value);
              if (e.target.value.replace(/\D/g, '').length === 8) {
                fetchAddress(e.target.value);
              } else {
                setState('');
                setCity('');
                setNeighborhood('');
                setStreet('');
              }
            }}
            placeholder="Digite o CEP"
            required
          />
          {loading && <span className={styles.loadingMessage}>Carregando...</span>}
          {error && <span className={styles.errorMessage}>{error}</span>}
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="state">Estado</label>
          <input
            type="text"
            id="state"
            value={state}
            onChange={(e) => setState(e.target.value)}
            required
          />
        </div>
      </div>
      <div className={styles.formRow}>
        <div className={styles.inputGroup}>
          <label htmlFor="city">Município</label>
          <input
            type="text"
            id="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="neighborhood">Bairro</label>
          <input
            type="text"
            id="neighborhood"
            value={neighborhood}
            onChange={(e) => setNeighborhood(e.target.value)}
            required
          />
        </div>
      </div>
      <div className={styles.formRow}>
        <div className={styles.inputGroup}>
          <label htmlFor="street">Rua</label>
          <input
            type="text"
            id="street"
            value={street}
            onChange={(e) => setStreet(e.target.value)}
            required
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="streetNumber">Número</label>
          <input
            type="text"
            id="streetNumber"
            value={streetNumber}
            onChange={(e) => setStreetNumber(e.target.value)}
            required
          />
        </div>
      </div>
      <div className={`${styles.inputGroup} ${styles.fullWidth}`}>
        <label>Plano</label>
        <fieldset className={styles.radioGroup}>
          <legend style={{ display: 'none' }}>Plano</legend>
          <div className={styles.radioOption}>
            <label>
              <input
                type="radio"
                name="plan"
                value="basic"
                checked={plan === 'basic'}
                onChange={(e) => setPlan(e.target.value)}
              />
              <span>Básico - R$ 29,90/mês</span>
            </label>
          </div>
          <div className={styles.radioOption}>
            <label>
              <input
                type="radio"
                name="plan"
                value="premium"
                checked={plan === 'premium'}
                onChange={(e) => setPlan(e.target.value)}
              />
              <span>Premium - R$ 49,90/mês</span>
            </label>
          </div>
          <div className={styles.radioOption}>
            <label>
              <input
                type="radio"
                name="plan"
                value="enterprise"
                checked={plan === 'enterprise'}
                onChange={(e) => setPlan(e.target.value)}
              />
              <span>Enterprise - R$ 99,90/mês</span>
            </label>
          </div>
        </fieldset>
      </div>
      <div className={`${styles.inputGroup} ${styles.stripeCard}`}>
        <label>Detalhes do Cartão</label>
        <CardElement options={{ style: { base: { fontSize: '16px', color: '#424770' } } }} />
      </div>
      <button type="submit" className={styles.submitButton} disabled={processing || loading}>
        {processing ? 'Processando...' : 'Finalizar Compra'}
      </button>
      {paymentError && <span className={styles.errorMessage}>{paymentError}</span>}
      {paymentSuccess && <span className={styles.successMessage}>Pagamento realizado com sucesso!</span>}
    </form>
  );
};

export default PaymentForm;