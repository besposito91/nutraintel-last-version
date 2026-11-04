// Sostituisci i placeholder quando gli asset reali sono pronti.
// Le variabili VITE_* possono essere impostate in un file .env
export const NUTRAINTEL_CONFIG = {
  // Esempio: [{ url: 'https://.../bilancia.webp', label: 'Bilancia' }, ...] (max 9, CORS abilitato)
  media: [],
  // URL embed (YouTube/Vimeo) del video promozionale
  videoUrl: import.meta.env.VITE_VIDEO_URL || '',
  // Endpoint POST JSON (webhook CRM, es. GoHighLevel / Make / Zapier)
  formEndpoint: import.meta.env.VITE_FORM_ENDPOINT || '',
};
