import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
        // CONFIGURAÇÃO ESSENCIAL PARA GITHUB PAGES
        // O valor deve ser o nome do seu repositório, cercado por barras.
        // Se fosse o root (https://username.github.io/), seria apenas '/'.
        base: '/farmaciadotrabalhador/',

        server: {
            port: 3000,
            host: '0.0.0.0',
        },
        plugins: [react()],
        define: {
            // Mantendo a configuração das variáveis de ambiente
            'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
            'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
        },
        resolve: {
            alias: {
                // Mantendo o alias
                '@': path.resolve(__dirname, '.'),
            }
        }
    };
});
