import React, { useState, useEffect } from 'react';
import styles from './Payment.module.css';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Payment = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [plan, setPlan] = useState('basic');
  const [cep, setCep] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [neighborhood, setNeighborhood] = useState('');
  const [street, setStreet] = useState('');
  const [streetNumber, setStreetNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

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

  const handleCepChange = (e) => {
    const cepValue = e.target.value;
    setCep(cepValue);
    if (cepValue.replace(/\D/g, '').length === 8) {
      fetchAddress(cepValue);
    } else {
      setState('');
      setCity('');
      setNeighborhood('');
      setStreet('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <section className={styles.payment}>
      <div className={styles.leftSide}>
        <h2 className={styles.title} data-aos="fade-up">Escolha seu Plano Viva Watch</h2>
        <p className={styles.description} data-aos="fade-up" data-aos-delay="100">
          Adquira o Viva Watch e aproveite os melhores recursos de monitoramento de saúde, atividade e segurança. Escolha o plano que melhor atende às suas necessidades e comece a usar hoje mesmo com nossa garantia de satisfação!
        </p>
        <div className={styles.contactInfo} data-aos="fade-up" data-aos-delay="200">
          <p>suporte@vivawatch.com</p>
          <p>Compras: (11) 98765-4321</p>
        </div>
      </div>
      <div className={styles.rightSide} data-aos="fade-right">
        <div className={styles.formCard}>
          <h3 className={styles.formTitle}>Realizar Compra</h3>
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

            <div className={styles.formRow}>
              <div className={styles.inputGroup}>
                <label htmlFor="cep">CEP</label>
                <input
                  type="text"
                  id="cep"
                  value={cep}
                  onChange={handleCepChange}
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

            <button type="submit" className={styles.submitButton} disabled={loading}>
              Finalizar Compra
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Payment;