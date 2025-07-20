# SaaS Gemini - Node.js & Vite React

Este projeto é um SaaS Gemini construído com Node.js (backend) e um frontend SPA desenvolvido com Vite e React.

**Requisitos:**

* Node.js v22 ou superior (recomendado usar o [nvm](https://github.com/nvm-sh/nvm) para gerenciamento de versões).


**Instalação:**

1. **Clone o repositório:**  `git clone <link_do_repositorio>`
2. **Backend:**
   ```bash
   cd backend
   npm install
   ```
3. **Frontend:**
   ```bash
   cd frontend
   npm install
   ```

**Execução:**

Para executar a aplicação, abra dois terminais:

**Terminal 1 (Backend):**

```bash
cd backend
npm start
```

**Terminal 2 (Frontend):**

```bash
cd frontend
npm run dev
```

**Observação:**  O backend e o frontend rodam em portas diferentes.  O frontend deve ser configurado para se comunicar com a porta correta do backend (verifique os arquivos de configuração).
