import React, { useState, useEffect } from 'react';
import styles from './Support.module.css';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Support = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [category, setCategory] = useState('duvida');
  const [description, setDescription] = useState('');
  const [attachment, setAttachment] = useState(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setError('');

    const formData = new FormData();
    formData.append('name', name);
    formData.append('phone', phone);
    formData.append('email', email);
    formData.append('category', category);
    formData.append('description', description);
    if (attachment) {
      formData.append('attachment', attachment);
    }

    try {
      const response = await fetch('http://localhost:5000/api/send-support-email', {
        method: 'POST',
        body: formData
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message);
        setName('');
        setPhone('');
        setEmail('');
        setCategory('duvida');
        setDescription('');
        setAttachment(null);
      } else {
        setError(data.message || 'Erro ao enviar');
      }
    } catch (err) {
      setError('Erro de rede. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    setAttachment(e.target.files[0]);
  };

  //funcao para formatar o cel
  function formatPhoneNumber(value) {

    const digits = value.replace(/\D/g, ''); 

    if (digits.length <= 10) {
      return digits.replace(/^(\d{2})(\d{0,4})(\d{0,4})$/, '($1) $2-$3');
    } else {
      return digits.replace(/^(\d{2})(\d{0,5})(\d{0,4})$/, '($1) $2-$3');
    }
  }

  return (
    <section className={styles.support}>
      <div className={styles.leftSide}>
        <h2 className={styles.title} data-aos="fade-up">Suporte Técnico</h2>
        <p className={styles.description} data-aos="fade-up" data-aos-delay="100">
          Precisa de ajuda? A equipe do Viva Watch está à disposição para tirar dúvidas, ajudar com reembolsos e orientar no uso do dispositivo. Oferecemos suporte desde a ativação até o uso de recursos como saúde, notificações e configurações. Também auxiliamos em trocas, garantias e questões de pagamento. Conte conosco para aproveitar ao máximo seu Viva Watch com tranquilidade.
        </p>
        <div className={styles.contactInfo} data-aos="fade-up" data-aos-delay="200">
          <p>info@vivawatch.com</p>
          <p>Suporte: (11) 1234-5678</p>
        </div>
      </div>
      <div className={styles.rightSide} data-aos="fade-right">
        <div className={styles.formCard}>
          <h3 className={styles.formTitle}>Envie sua Mensagem</h3>
          <form onSubmit={handleSubmit}>
            <div className={styles.formRow}>
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
                <label htmlFor="phone">Celular</label>
                <input
                  type="tel"
                  id="phone"
                  placeholder='Celular com DDD'
                  maxLength={15}
                  value={phone}
                  onChange={(e) => setPhone(formatPhoneNumber(e.target.value))}
                  required
                />
              </div>
            </div>
            <div className={styles.formRow}>
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
            </div>
            <div className={`${styles.inputGroup} ${styles.fullWidth}`}>
              <label>Categoria</label>
              <fieldset className={styles.radioGroup}>
                <legend style={{ display: 'none' }}>Categoria</legend>
                <label>
                  <input
                    type="radio"
                    name="category"
                    value="duvida"
                    checked={category === 'duvida'}
                    onChange={(e) => setCategory(e.target.value)}
                  />
                  Dúvidas
                </label>
                <label>
                  <input
                    type="radio"
                    name="category"
                    value="reembolso"
                    checked={category === 'reembolso'}
                    onChange={(e) => setCategory(e.target.value)}
                  />
                  Reembolso
                </label>
                <label>
                  <input
                    type="radio"
                    name="category"
                    value="uso"
                    checked={category === 'uso'}
                    onChange={(e) => setCategory(e.target.value)}
                  />
                  Defeitos
                </label>
              </fieldset>
            </div>
            <div className={`${styles.inputGroup} ${styles.fullWidth}`}>
              <label htmlFor="description">Descrição</label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>
            <div className={`${styles.inputGroup} ${styles.fullWidth}`}>
              <label htmlFor="attachment">Anexar Arquivo</label>
              <input
                type="file"
                id="attachment"
                onChange={handleFileChange}
                aria-describedby="attachment-help"
              />
              <small id="attachment-help" className={styles.helpText}>
                Arquivos suportados: PDF, PNG, JPG (máx. 5MB)
              </small>
            </div>
            <button type="submit" className={styles.submitButton} disabled={loading}>
              {loading ? 'Enviando...' : 'Enviar Mensagem'}
            </button>
            {message && <p className={styles.successMessage}>{message}</p>}
            {error && <p className={styles.errorMessage}>{error}</p>}
            {loading && <p className={styles.loadingMessage}>Enviando...</p>}
          </form>
        </div>
      </div>
    </section>
  );
};

export default Support;