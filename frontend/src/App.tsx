import { useState, type FormEvent } from 'react';

function App() {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!prompt) return;

    setIsLoading(true);
    setResponse('');
    setError(null);

    try {
      const res = await fetch('http://localhost:3001/api/gemini', { // URL do nosso backend
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });
      
      if (!res.ok) {
        throw new Error('Falha ao obter resposta do servidor.');
      }

      const data = await res.json();
      setResponse(data.response);

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ocorreu um erro desconhecido.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-4">
      <div className="w-full max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-center my-8 bg-gradient-to-r from-purple-400 to-blue-500 text-transparent bg-clip-text">
          Meu Assistente Gemini
        </h1>

        <form onSubmit={handleSubmit} className="w-full">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="w-full p-4 bg-gray-800 border-2 border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
            placeholder="Digite seu prompt aqui..."
            rows={4}
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-4 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-semibold transition-all duration-300 disabled:bg-gray-500 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Pensando...' : 'Enviar'}
          </button>
        </form>

        {error && <div className="mt-6 p-4 bg-red-900/50 border border-red-500 rounded-lg text-center">{error}</div>}

        {response && (
          <div className="mt-6 p-6 bg-gray-800 border border-gray-700 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Resposta:</h2>
            <p className="text-gray-300 whitespace-pre-wrap">{response}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;