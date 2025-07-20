// 1. Importações e Configuração Inicial
import express from 'express';
import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config(); // Carrega as variáveis de ambiente do .env

const app = express();
const port = process.env.PORT || 3001; // Porta do servidor

// 2. Configuração dos Middlewares
app.use(cors()); // Permite requisições de outras origens (nosso frontend)
app.use(express.json()); // Permite que o Express entenda requisições com corpo em JSON

// 3. Inicialização do Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" }); // Usando um modelo rápido e eficiente

// 4. Definição da Rota da API
app.post('/api/gemini', async (req, res) => {
  try {
    const { prompt } = req.body; // Pega o prompt do corpo da requisição

    if (!prompt) {
      return res.status(400).json({ error: 'O prompt é obrigatório.' });
    }

    // 5. Chamada para a API do Gemini
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // 6. Envio da resposta para o cliente
    res.json({ response: text });

  } catch (error) {
    console.error("Erro ao comunicar com a API do Gemini:", error);
    res.status(500).json({ error: 'Falha ao processar a sua solicitação.' });
  }
});

// 7. Iniciando o Servidor
app.listen(port, () => {
  console.log(`🚀 Servidor rodando na porta ${port}`);
});