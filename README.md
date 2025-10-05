# Viva Watch 

## Descrição
Este projeto é uma landing page desenvolvida para o **Viva Watch**, um relógio inteligente fictício projetado para monitoramento de idosos, com foco em segurança na detecção de quedas. A página é uma **versão inicial** em desenvolvimento, criada como um projeto integrador para a disciplina **Desenvolvimento Web, Experiência do Usuário e Internet das Coisas e Aplicações** 

## Tecnologias Utilizadas
- **Frontend**: React (com Vite) e CSS Modules
- **Backend**: Node.js e Express 
- **Autenticação**: JWT (JSON Web Tokens) e Bcrypt
- **Animações**: AOS (Animate on Scroll)

## Funcionalidades Atuais
- Landing page  com seções: Hero, About (Missão/Valores/Visão), CustormersReviews, Features, Updates, Pricing e Footer.
- Autenticação simples (registro e login) via modal, com token salvo no localStorage.
- Integração frontend-backend com API REST básica.

## Status do Projeto
**Versão Inicial - Em Desenvolvimento**  
Esta é uma versão inicial do projeto, funcionando como um MVP. As funcionalidades estão em fase de teste e aprimoramento. Algumas áreas ainda estão em construção, e novos componentes serão adicionados ao longo do tempo.

### Planos Futuros
- Implementação do **React Router** para navegação entre páginas (ex.: dashboard pós-autenticação).
- Adição de novos componentes, como suporte técnico e formulário de compra.
- Expansão de rotas protegidas (ex.: áreas exclusivas para usuários logados).
- Melhorias na experiência do usuário (UX)

## Como Executar o Projeto
1. **Pré-requisitos**:
   - Node.js (v14 ou superior)
   - MySQL (configurado com banco `viva_watch_db`)
   - Clone o repositório: `git clone https://github.com/VitorKavaharada/VivaWatch.git`

2. **Backend**:
   - Acesse a pasta `backend`: `cd backend`
   - Instale as dependências: `npm install`
   - Configure o `.env` com credenciais MySQL e a chave JWT 
   - Inicie o servidor: `node index.js`

3. **Frontend**:
   - Acesse a pasta `frontend`: `cd frontend`
   - Instale as dependências: `npm install`
   - Inicie a aplicação: `npm run dev`

4. **Banco de Dados**:
   - Crie a tabela `users` no MySQL com os campos `id`, `email` (único) e `password`.
