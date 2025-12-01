import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// Define o nome do repositório para o caminho base do GitHub Pages.
// É essencial que este valor corresponda ao nome do seu repositório no GitHub.
const REPO_NAME = 'farmaciadotrabalhador'; 

export default defineConfig(({ mode }) => {
    // Carrega variáveis de ambiente, como a GEMINI_API_KEY.
    const env = loadEnv(mode, '.', '');
    
    // Define o caminho base (base) dinamicamente:
    // - Se for modo 'production' (npm run build), usa o nome do repositório
    //   (ex: /farmaciadotrabalhador/).
    // - Se for modo 'development' (npm run dev), usa apenas a raiz (/).
    const base = mode === 'production' 
        ? `/${REPO_NAME}/`
        : '/';

    return {
        // Aplica o caminho base configurado.
        base: base,

        server: {
            port: 3000,
            host: '0.0.0.0',
        },
        plugins: [react()],
        define: {
            // Configuração das variáveis de ambiente para a API do Google Gemini
            'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
            'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
        },
        resolve: {
            alias: {
                // Mantém o alias '@' para a raiz do projeto
                '@': path.resolve(__dirname, '.'),
            }
        }
    };
});
