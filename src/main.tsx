import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@/styles/index.css';
import App from './App.tsx';
import { initRuntimeConfig } from '@/app/config/runtime';

async function bootstrap(): Promise<void> {
  // Resolves quickly and never throws: without a launchpad config, today's behavior applies.
  await initRuntimeConfig();

  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}

void bootstrap();
