import { getRuntimeConfig } from './runtime';

interface Env {
  readonly FAAS_URL: string;
  FAAS_TOKEN: string;
  MODE: string;
  DEV: boolean;
  PROD: boolean;
}

function buildTimeFaasUrl(): string {
  return (
    (import.meta.env['VITE_FAAS_URL'] as string | undefined) ??
    (typeof window !== 'undefined' && window.location.origin.includes('dashboard.metacall.io')
      ? 'https://api.metacall.io'
      : 'http://localhost:9000')
  ).replace('dashboard.metacall.io', 'api.metacall.io');
}

export const env: Env = {
  // Getter so the launchpad runtime config (loaded after module evaluation) is honored.
  get FAAS_URL() {
    return getRuntimeConfig().faasUrl ?? buildTimeFaasUrl();
  },
  FAAS_TOKEN: (import.meta.env['VITE_FAAS_TOKEN'] as string | undefined) ?? 'local',
  MODE: import.meta.env.MODE,
  DEV: import.meta.env.DEV,
  PROD: import.meta.env.PROD,
};
