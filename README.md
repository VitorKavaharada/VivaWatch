# Viva Watch 

## Descrição
O **Viva Watch** é uma **Single Page Application (SPA)** desenvolvida para o monitoramento de idosos, com foco em segurança e detecção de quedas. O projeto inclui uma **landing page** como ponto de entrada, apresentando o produto com seções como Hero, About, Features, Pricing e Footer, e evolui para um sistema interativo com navegação dinâmica (via React Router), autenticação (JWT) e um dashboard para usuários autenticados. Esta é uma **versão inicial** em desenvolvimento, criada como projeto integrador para a disciplina **Desenvolvimento Web, Experiência do Usuário e Internet das Coisas e Aplicações**. 

## Tecnologias Utilizadas
- **Frontend**: React (com Vite) e CSS Modules
- **Backend**: Node.js e Express 
- **Autenticação**: JWT (JSON Web Tokens) e Bcrypt
- **Animações**: AOS (Animate on Scroll)

## Funcionalidades Atuais
- Landing page  com seções: Hero, About (Missão/Valores/Visão), CustormersReviews, Features, Updates, Pricing, Support e Footer.
- Autenticação simples (registro e login) via modal, com token salvo no localStorage.
- Integração frontend-backend com API REST básica.

## Status do Projeto
**Versão Inicial - Em Desenvolvimento**  
Esta é uma versão inicial do projeto, funcionando como um MVP. As funcionalidades estão em fase de teste e aprimoramento. Algumas áreas ainda estão em construção, e novos componentes serão adicionados ao longo do tempo.

### Melhorias adicionadas:

**Navegação e Autenticação**
- Implementada navegação SPA com React Router (BrowserRouter, Routes, Route).
- Rotas públicas (/auth) e protegidas (/protected) com PrivateRoute.
- Estado de autenticação (isLoggedIn) centralizado para controle global.

**Refatoração do Backend**
- Adoção do padrão MVC com Sequelize.
- Separação de responsabilidades antes concentradas no index.js

**Novos Componentes**
- Suporte Técnico: Layout com envio de e-mails via Nodemailer.
- Dashboard: Interface protegida para usuários autenticados. (Atualmente os dados são estáticos).
- Pagamento: Formulário com integração inicial ao Stripe.

### Planos Futuros
- Stripe Subscriptions: Migração para planos recorrentes (Básico, Premium, Enterprise) com webhooks.
- Perfil do Idoso: Componente  para coleta de dados sensíveis pós-pagamento.
- Dashboard Dinâmico: Visualização de dados de sensores (quedas, passos, batimentos) por meio integração IoT.
- Notificações por Email: Confirmações de pagamento, alertas de queda e recibos mensais via Nodemailer.
- Melhorias na experiência do usuário (UX)

## Como Executar o Projeto
1. **Pré-requisitos**:
   - Node.js (v14 ou superior)
   - MySQL (configurado com banco `viva_watch_db`)
   - Clone o repositório: `git clone https://github.com/VitorKavaharada/VivaWatch.git`
   - Crie uma conta gratuita no ambiente de testes (Sandbox) da plataforma Stripe: https://dashboard.stripe.com/register
   - Crie uma senha de app no gmail

2. **Banco de Dados**:
   - Crie o banco de dados com o mesmo nome usado no arquivo .env na variável DB_NAME.

3. **Backend**:
   - Acesse a pasta `backend`: `cd backend`
   - Instale as dependências: `npm install`
   - Crie e configure o `.env` com credenciais MySQL, a chave JWT, variáveis do nodemailer e chave pública do Stripe baseado no arquivo .env.example
   - Inicie o servidor: `npm start `

4. **Frontend**:
   - Acesse a pasta `frontend`: `cd frontend`
   - Instale as dependências: `npm install`
   - Crie e configure o `.env` com  a chave pública do Stripe  baseado no arquivo .env.example
   - Inicie a aplicação: `npm run dev`

