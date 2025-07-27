// Use Vite's built-in env variables to distinguish between prod and dev
export const API_BASE_URL = import.meta.env.PROD
  ? 'https://otb-server-production.up.railway.app/api'
  : 'http://localhost:3001/api';
