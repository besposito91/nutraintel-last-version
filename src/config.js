// Sostituisci i placeholder quando gli asset reali sono pronti.
// Le variabili VITE_* possono essere impostate in un file .env
export const NUTRAINTEL_CONFIG = {
  // Esempio: [{ url: 'https://.../bilancia.webp', label: 'Bilancia' }, ...] (max 9, CORS abilitato)
  media: [],
  // File locale di fallback. VITE_VIDEO_URL puo' sostituirlo in futuro con
  // un MP4 remoto oppure con un URL embed YouTube/Vimeo.
  videoUrl: import.meta.env.VITE_VIDEO_URL || '/video/nutraintel-presentazione.mp4',
  // Endpoint POST JSON (webhook CRM, es. GoHighLevel / Make / Zapier)
  formEndpoint: import.meta.env.VITE_FORM_ENDPOINT || '',
};
